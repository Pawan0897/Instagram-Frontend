import http from "./http";
import { ENDPOINTS as E, ENUMS } from "./endpoint";

/**
 * Har function ek backend route ko call karta hai.
 * Mutations pura envelope return karte hain ({message, data}) taaki toast me message dikha sako.
 * Queries sirf `data` return karti hain.
 */

const data = (p) => p.then((r) => r.data);
const asForm = (obj) => {
  const fd = new FormData();
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") fd.append(k, v);
  });
  return fd;
};

/* ------------------------------- AUTH ------------------------------- */
export const authApi = {
  login: (body) => http.post(E.AUTH.LOGIN, { deviceType: ENUMS.DEVICE_TYPE.WEB, ...body }),
  sendOtp: (body) => http.post(E.AUTH.SEND_OTP, body),
  verifyOtp: (body) =>
    http.post(E.AUTH.VERIFY_OTP, { deviceType: ENUMS.DEVICE_TYPE.WEB, ...body, code: Number(body.code) }),
  logout: () => http.get(E.AUTH.LOGOUT),
  changePassword: (body) => http.post(E.AUTH.CHANGE_PASSWORD, body),
};

/* ------------------------------ PROFILE ----------------------------- */
export const profileApi = {
  me: () => data(http.get(E.PROFILE.ME)),
  update: (body) => http.put(E.PROFILE.UPDATE, body),
  sendOtpToUpdate: (email) =>
    http.post(E.PROFILE.SEND_OTP_TO_UPDATE, { otpType: ENUMS.OTP_TYPE.UPDATE, email }),
  verifyOtpToUpdate: ({ email, code }) =>
    http.post(E.PROFILE.VERIFY_OTP_TO_UPDATE, {
      otpType: ENUMS.OTP_TYPE.UPDATE,
      email,
      code: Number(code),
    }),
  deleteAccount: () => http.delete(E.PROFILE.DELETE_ACCOUNT),
  people: () => data(http.get(E.PROFILE.USERS)).catch(() => []),
  avatar: (file) => http.put(E.PROFILE.AVATAR, asForm({ import_posts: file })),
};

/* -------------------------------- POST ------------------------------ */
export const postApi = {
  feed: () => data(http.get(E.POST.FEED)),
  mine: () => data(http.get(E.POST.MY_POSTS)),
  byId: (id) => data(http.get(E.POST.BY_ID(id))),
  // multipart: field name backend me "import_posts" hai (Upload.js)
  create: ({ file, caption }) => http.post(E.POST.CREATE, asForm({ import_posts: file, caption })),
  update: ({ id, file, caption }) =>
    http.put(E.POST.UPDATE(id), asForm({ import_posts: file, caption })),
  remove: (postId) => http.delete(E.POST.DELETE, { data: { postId } }),
};

/* -------------------------------- LIKE ------------------------------ */
export const likeApi = {
  toggle: (postId) => http.post(E.LIKE.TOGGLE, { postId }),
  mine: () => data(http.get(E.LIKE.MY_LIKED_POSTS)),
  count: (postId) => data(http.get(E.LIKE.COUNT(postId))),
  byMe: (postId) => data(http.get(E.LIKE.BY_ME(postId))).catch(() => []),
  // likes na hone par backend error throw karta hai -> empty list treat karo
  users: (postId) => data(http.get(E.LIKE.USERS(postId))).catch(() => []),
};

/* ------------------------------ COMMENT ----------------------------- */
export const commentApi = {
  list: (postId) => data(http.get(E.COMMENT.LIST(postId))),
  create: ({ postId, text }) => http.post(E.COMMENT.CREATE, { postId, text }),
  update: ({ commentId, text }) => http.put(E.COMMENT.UPDATE, { commentId, text }),
  remove: (commentId) => http.delete(E.COMMENT.DELETE(commentId)),
};

/* ------------------------------ FOLLOW ------------------------------ */
export const followApi = {
  toggle: (followTo) => http.post(E.FOLLOW.TOGGLE, { followTo }),
  respond: ({ _id, followStatus }) => http.post(E.FOLLOW.ACCEPT_REJECT, { _id, followStatus }),
  // 0 followers par backend error deta hai -> empty shape return
  followers: () =>
    data(http.get(E.FOLLOW.FOLLOWERS)).catch(() => ({ followers: [], followersCount: 0 })),
  following: () =>
    data(http.get(E.FOLLOW.FOLLOWING)).catch(() => ({ following: [], followingCount: 0 })),
  requests: () => data(http.get(E.FOLLOW.REQUESTS)).catch(() => []),
  status: (userId) => data(http.get(E.FOLLOW.STATUS(userId))),
};

/* ------------------------------ ADDRESS ----------------------------- */
export const addressApi = {
  save: (body) => http.post(E.ADDRESS.SAVE, { ...body, number: Number(body.number) }),
};
