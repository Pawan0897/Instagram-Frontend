import * as Yup from "yup";

// Saare Yup schemas ek jagah. Rules backend ki Joi validations (app/validations) se match karte hain.
const email = Yup.string().trim().email("Enter a valid email").required("Email is required");
const password = Yup.string().min(6, "At least 6 characters").required("Password is required");
const code = Yup.string().matches(/^\d+$/, "Digits only").required("Enter the code");

export const loginSchema = Yup.object({
  email,
  password: Yup.string().required("Password is required"),
});

export const signupSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim(),
  email,
  password,
});

export const emailOnlySchema = Yup.object({ email });

export const otpLoginSchema = Yup.object({ code });

export const resetSchema = Yup.object({ code, password });

export const postSchema = Yup.object({
  file: Yup.mixed().required("Choose a photo"),
  caption: Yup.string().max(500, "Max 500 characters"),
});

export const commentSchema = Yup.object({
  text: Yup.string().trim().required(),
});

export const passwordSchema = Yup.object({
  oldPassword: Yup.string().required("Enter your current password"),
  newPassword: password.notOneOf([Yup.ref("oldPassword")], "Must differ from the current password"),
});

export const newEmailSchema = Yup.object({ email });
export const verifyEmailSchema = Yup.object({ code });

export const addressSchema = Yup.object({
  pinCode: Yup.string().matches(/^\d{4,10}$/, "Enter a valid PIN code").required("PIN code is required"),
  number: Yup.string().matches(/^\d{8,15}$/, "Enter 8–15 digits").required("Number is required"),
});

export const requestSchema = Yup.object({
  id: Yup.string().matches(/^[0-9a-f]{24}$/i, "Must be a 24-character ID").required("Request ID is required"),
});

export const profileSchema = Yup.object({
  firstName: Yup.string().trim(),
  lastName: Yup.string().trim(),
  userName: Yup.string().trim().matches(/^[a-zA-Z0-9._]*$/, "Letters, numbers, . and _ only").max(30),
});
