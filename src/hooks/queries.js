import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addressApi, authApi, commentApi, followApi, likeApi, postApi, profileApi,
} from "../api/services";
import { useToast } from "../context/ToastContext";

/* ---------------------------- query keys ---------------------------- */
export const qk = {
  me: ["me"],
  feed: ["posts", "feed"],
  myPosts: ["posts", "mine"],
  post: (id) => ["posts", "detail", id],
  likeCount: (id) => ["likes", "count", id],
  likedByMe: (id) => ["likes", "byMe", id],
  likers: (id) => ["likes", "users", id],
  myLikes: ["likes", "mine"],
  comments: (id) => ["comments", id],
  followers: ["follow", "followers"],
  following: ["follow", "following"],
};

/* ------------------------------ queries ----------------------------- */
export const useFeed = () => useQuery({ queryKey: qk.feed, queryFn: postApi.feed });
export const useMyPosts = () => useQuery({ queryKey: qk.myPosts, queryFn: postApi.mine });
export const usePost = (id, enabled = true) =>
  useQuery({ queryKey: qk.post(id), queryFn: () => postApi.byId(id), enabled: !!id && enabled });

export const useLikeCount = (id) =>
  useQuery({ queryKey: qk.likeCount(id), queryFn: () => likeApi.count(id), select: (d) => d?.[0]?.likeCount ?? 0 });
export const useLikedByMe = (id) =>
  useQuery({ queryKey: qk.likedByMe(id), queryFn: () => likeApi.byMe(id), select: (d) => Array.isArray(d) && d.length > 0 });
export const useLikers = (id, enabled = true) =>
  useQuery({ queryKey: qk.likers(id), queryFn: () => likeApi.users(id), enabled });
export const useMyLikes = () => useQuery({ queryKey: qk.myLikes, queryFn: likeApi.mine });

export const useComments = (id) =>
  useQuery({ queryKey: qk.comments(id), queryFn: () => commentApi.list(id) });

export const useFollowers = () => useQuery({ queryKey: qk.followers, queryFn: followApi.followers });
export const useFollowing = () => useQuery({ queryKey: qk.following, queryFn: followApi.following });

/* ----------------------------- mutations ---------------------------- */
// Chhota helper: success/error toast + invalidate
function useAction(mutationFn, { invalidate = [], success = true, onSuccess } = {}) {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn,
    onSuccess: (res, vars) => {
      if (success && res?.message) toast.success(res.message);
      invalidate.forEach((key) => qc.invalidateQueries({ queryKey: key }));
      onSuccess?.(res, vars, qc);
    },
    onError: (err) => toast.error(err.message),
  });
}

/* ---- auth ---- */
export const useLogin = (opts) => useAction(authApi.login, { ...opts });
export const useSignup = (opts) => useAction(authApi.signup, { ...opts });
export const useSendOtp = (opts) => useAction(authApi.sendOtp, { ...opts });
export const useVerifyOtp = (opts) => useAction(authApi.verifyOtp, { ...opts });
export const useChangePassword = (opts) => useAction(authApi.changePassword, { ...opts });
export const useLogout = (opts) => useAction(authApi.logout, { success: false, ...opts });

/* ---- profile ---- */
export const useUpdateProfile = (opts) =>
  useAction(profileApi.update, {
    ...opts,
    onSuccess: (res, vars, qc) => {
      const { password, ...safe } = res.data || {}; // backend updated doc me hashed password bhej deta hai
      qc.setQueryData(qk.me, (old) => ({ ...old, ...safe }));
      qc.invalidateQueries({ queryKey: qk.feed });
      opts?.onSuccess?.(res, vars, qc);
    },
  });
export const useSendOtpToUpdate = (opts) => useAction(profileApi.sendOtpToUpdate, { ...opts });
export const useVerifyOtpToUpdate = (opts) =>
  useAction(profileApi.verifyOtpToUpdate, { invalidate: [qk.me], ...opts });
export const useDeleteAccount = (opts) => useAction(profileApi.deleteAccount, { ...opts });
export const useSaveAddress = (opts) => useAction(addressApi.save, { ...opts });

/* ---- post ---- */
const postLists = [qk.feed, qk.myPosts];
export const useCreatePost = (opts) => useAction(postApi.create, { invalidate: postLists, ...opts });
export const useUpdatePost = (opts) =>
  useAction(postApi.update, {
    invalidate: [...postLists, ["posts", "detail"]],
    ...opts,
  });
export const useDeletePost = (opts) =>
  useAction(postApi.remove, { invalidate: [...postLists, qk.myLikes], ...opts });

/* ---- like (optimistic) ---- */
export function useToggleLike(postId) {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: () => likeApi.toggle(postId),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: qk.likedByMe(postId) });
      const prevBy = qc.getQueryData(qk.likedByMe(postId));
      const prevCount = qc.getQueryData(qk.likeCount(postId));
      const wasLiked = Array.isArray(prevBy) && prevBy.length > 0;

      qc.setQueryData(qk.likedByMe(postId), wasLiked ? [] : [{ optimistic: true }]);
      qc.setQueryData(qk.likeCount(postId), (old) => {
        const first = old?.[0] || {};
        const next = Math.max(0, (first.likeCount ?? 0) + (wasLiked ? -1 : 1));
        return [{ ...first, likeCount: next }];
      });
      return { prevBy, prevCount };
    },
    onError: (err, _v, ctx) => {
      qc.setQueryData(qk.likedByMe(postId), ctx?.prevBy);
      qc.setQueryData(qk.likeCount(postId), ctx?.prevCount);
      toast.error(err.message);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: qk.likedByMe(postId) });
      qc.invalidateQueries({ queryKey: qk.likeCount(postId) });
      qc.invalidateQueries({ queryKey: qk.likers(postId) });
      qc.invalidateQueries({ queryKey: qk.myLikes });
    },
  });
}

/* ---- comment ---- */
export const useAddComment = (postId, opts) =>
  useAction(commentApi.create, { invalidate: [qk.comments(postId)], success: false, ...opts });
export const useEditComment = (postId, opts) =>
  useAction(commentApi.update, { invalidate: [qk.comments(postId)], ...opts });
export const useDeleteComment = (postId, opts) =>
  useAction(commentApi.remove, { invalidate: [qk.comments(postId)], ...opts });

/* ---- follow ---- */
export const useToggleFollow = (opts) =>
  useAction(followApi.toggle, { invalidate: [qk.following, qk.feed, qk.followers], ...opts });
export const useRespondFollow = (opts) =>
  useAction(followApi.respond, { invalidate: [qk.followers, qk.feed], ...opts });
