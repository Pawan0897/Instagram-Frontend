import axios from "axios";

/**
 * Ek hi axios instance poori app ke liye.
 *  - x-portal: user      -> backend har request pe maangta hai (app.js)
 *  - appkey              -> encryption middleware bypass (dev/testing ke liye)
 *  - Authorization       -> Bearer <jwt> (Auth.verify)
 *  - Response envelope   -> { statusCode, message, data, status }
 */

const TOKEN_KEY = "frame_token";

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export class ApiError extends Error {
  constructor(message, { status, fields, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields || []; // Joi validation errors: [{field, message}]
    this.data = data;
  }
}

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 20000,
});

http.interceptors.request.use((config) => {
  config.headers["x-portal"] = "user";
  config.headers["x-timezone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const appKey = import.meta.env.VITE_APP_KEY;
  if (appKey) config.headers.appkey = appKey;

  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

http.interceptors.response.use(
  // envelope as-is return: { message, data, ... }
  (res) => res.data,
  (err) => {
    const status = err.response?.status;
    const body = err.response?.data;

    // Backend ke error shapes:
    //  1) res.error()        -> { statusCode, message, data, isSessionExpired }
    //  2) Validator          -> { status:'error', message:'Validation error', errors:[{field,message}] }
    //  3) global handler     -> { success:false, message }
    //  4) encryption block   -> { message:'Invalid Request' } (429)
    const fields = Array.isArray(body?.errors) ? body.errors : [];
    const message =
      fields.length > 0
        ? fields.map((e) => e.message).join(", ")
        : body?.message || err.message || "Something went wrong";

    if (status === 401 && body?.isSessionExpired) {
      tokenStore.clear();
      window.dispatchEvent(new Event("auth:expired"));
    }

    return Promise.reject(new ApiError(message, { status, fields, data: body }));
  }
);

export default http;
