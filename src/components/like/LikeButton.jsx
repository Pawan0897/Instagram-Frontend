import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { likeApi } from "../../api/services";

// Uiverse-style heart (CSS: .uv-heart). Checked = liked.
export default function LikeButton({ postId }) {
  const queryClient = useQueryClient();

  // GET /like/likeByMe/:id -> array (khaali = like nahi kiya)
  const { data: liked = false } = useQuery({
    queryKey: ["likedByMe", postId],
    queryFn: () => likeApi.byMe(postId),
    select: (rows) => (rows?.length ?? 0) > 0,
  });

  // POST /like — like/unlike toggle
  const toggle = useMutation({
    mutationFn: () => likeApi.toggle(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likedByMe", postId] });
      queryClient.invalidateQueries({ queryKey: ["likeCount", postId] });
      queryClient.invalidateQueries({ queryKey: ["likers", postId] });
      queryClient.invalidateQueries({ queryKey: ["myLikes"] });
    },
  });

  return (
    <label className="uv-heart" aria-label={liked ? "Unlike" : "Like"}>
      <input type="checkbox" checked={liked} disabled={toggle.isPending} onChange={() => toggle.mutate()} />
      <svg viewBox="0 0 24 24">
        <path d="M12 20.5S3.5 15.2 3.5 9A4.5 4.5 0 0 1 12 6.8 4.5 4.5 0 0 1 20.5 9c0 6.2-8.5 11.5-8.5 11.5z" />
      </svg>
    </label>
  );
}
