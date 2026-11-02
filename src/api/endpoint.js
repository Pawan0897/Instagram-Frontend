/**
 * Saare backend routes yahan ek jagah.
 * Source: app/modules/<module>/core/controllers/*.js  (+ loadControllers.js => '/<controllerFileName>')
 *
 * Har request me x-portal: user header jata hai (http.js dekho).
 */

export const ENDPOINTS = {
  // ---------- onboarding.js (public) ----------
  AUTH: {
    SIGNUP: "/onboarding/signup", // POST  {firstName, lastName?, email, password(min 6), phone?, countryCode?, deviceType?}
    LOGIN: "/onboarding/login", // POST  {email, password, deviceType?}
    SEND_OTP: "/onboarding/send-otp", // POST  {otpType, email}
    VERIFY_OTP: "/onboarding/verify-otp", // POST  {otpType, email, code, password?, deviceType?}
    LOGOUT: "/onboarding/logout", // GET   (auth)
    CHANGE_PASSWORD: "/onboarding/change-password", // POST  {oldPassword, newPassword} (auth)
  },

  // ---------- onboarding.js (auth) ----------
  PROFILE: {
    ME: "/onboarding", // GET
    UPDATE: "/onboarding/user", // PUT
    SEND_OTP_TO_UPDATE: "/onboarding/send-otp-to-update", // POST {otpType: 4, email}
    VERIFY_OTP_TO_UPDATE: "/onboarding/verify-otp-to-update", // POST {otpType: 4, email, code}
    DELETE_ACCOUNT: "/onboarding", // DELETE
  },

  // ---------- post.js ----------
  POST: {
    CREATE: "/post/create-post", // POST multipart: import_posts(file), caption
    FEED: "/post", // GET   (me + accepted followings)
    MY_POSTS: "/post/myPost", // GET
    BY_ID: (id) => `/post/${id}`, // GET
    UPDATE: (id) => `/post/${id}`, // PUT multipart: import_posts(file), caption
    DELETE: "/post", // DELETE body {postId}
  },

  // ---------- like.js ----------
  LIKE: {
    TOGGLE: "/like", // POST {postId}  (like <-> unlike)
    MY_LIKED_POSTS: "/like/mylikedPost", // GET
    COUNT: (postId) => `/like/${postId}`, // GET
    BY_ME: (postId) => `/like/likeByMe/${postId}`, // GET
    USERS: (postId) => `/like/likeUserListing/${postId}`, // GET
  },

  // ---------- comment.js ----------
  COMMENT: {
    CREATE: "/comment", // POST {postId, text}
    LIST: (postId) => `/comment/${postId}`, // GET
    UPDATE: "/comment", // PUT  {commentId, text}
    DELETE: (commentId) => `/comment/${commentId}`, // DELETE
  },

  // ---------- follow.js ----------
  FOLLOW: {
    TOGGLE: "/follow", // POST {followTo}  (follow / request / unfollow)
    ACCEPT_REJECT: "/follow/accept-reject", // POST {_id, followStatus: 1 accept | 2 reject}
    FOLLOWERS: "/follow/myFollowers", // GET
    FOLLOWING: "/follow/following", // GET
  },

  // ---------- address.js (backend pe auth nahi hai) ----------
  ADDRESS: {
    SAVE: "/address/addresses", // POST {pinCode, number, userId}
  },

  // ---------- Admin server (admin.js, x-portal: admin, alag port) ----------
  // Is client me UI nahi hai, sirf reference ke liye.
  ADMIN: {
    LOGIN: "/admin/onboarding/login",
    SEND_OTP: "/admin/onboarding/send-otp",
    VERIFY_OTP: "/admin/onboarding/verify-otp",
    CHANGE_PASSWORD: "/admin/onboarding/change-password",
    PROFILE: "/admin/onboarding",
    LOGOUT: "/admin/onboarding/logout",
    ACCESS_ROLE: "/admin/access-role", // POST, GET, GET /:id, PUT /:id, DELETE /:id
  },
};

/** constants.js ke enums */
export const ENUMS = {
  OTP_TYPE: { SIGNUP: 1, LOGIN: 2, FORGET: 3, UPDATE: 4 },
  FOLLOW_STATUS: { PENDING: 0, ACCEPT: 1, REJECT: 2 },
  SOCIAL_ACCOUNT: { PUBLIC: 0, PRIVATE: 1 },
  GENDER: { MALE: 0, FEMALE: 1, OTHER: 2 },
  DEVICE_TYPE: { WEB: "WEB", ANDROID: "ANDROID", IOS: "IOS" },
  STUDY_PREFERENCES: {
    1: "Engineering",
    2: "Medicine",
    3: "Business",
    4: "Arts & Humanities",
    5: "Psychology",
    6: "Science & Research",
  },
};
