import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { ENUMS } from "../../api/endpoint";
import { authApi } from "../../api/services";
import { emailOnlySchema, resetSchema } from "../../lib/schemas";
import { notify } from "../../lib/alert";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);

  // POST /onboarding/send-otp  (otpType 3 = FORGET)
  const sendOtp = useMutation({
    mutationFn: authApi.sendOtp,
    onSuccess: () => setStep(2),
  });

  // POST /onboarding/verify-otp  (code + naya password) -> password reset
  const reset = useMutation({
    mutationFn: authApi.verifyOtp,
    onSuccess: () => {
      notify.success("Password updated. Log in with the new one.");
      navigate("/login");
    },
  });

  return (
    <>
      <h2 className="mb-1 text-center text-lg font-semibold">Reset password</h2>
      <p className="mb-5 text-center text-sm text-mute">
        {step === 1 ? "Enter your email and we'll send a code." : `Enter the code sent to ${email} and a new password.`}
      </p>

      {step === 1 ? (
        <Formik
          initialValues={{ email: "" }}
          validationSchema={emailOnlySchema}
          onSubmit={(v) => {
            const clean = v.email.trim().toLowerCase();
            setEmail(clean);
            sendOtp.mutate({ otpType: ENUMS.OTP_TYPE.FORGET, email: clean });
          }}
        >
          <Form className="space-y-3">
            <FormInput name="email" type="email" placeholder="Email" />
            <Button type="submit" full loading={sendOtp.isPending}>Send code</Button>
          </Form>
        </Formik>
      ) : (
        <Formik
          initialValues={{ code: "", password: "" }}
          validationSchema={resetSchema}
          onSubmit={(v) => reset.mutate({ otpType: ENUMS.OTP_TYPE.FORGET, email, ...v })}
        >
          <Form className="space-y-3">
            <FormInput name="code" inputMode="numeric" placeholder="Code" />
            <FormInput name="password" type="password" placeholder="New password" autoComplete="new-password" />
            <Button type="submit" full loading={reset.isPending}>Set new password</Button>
          </Form>
        </Formik>
      )}

      <Link to="/login" className="mt-6 block text-center text-sm font-medium text-brand">Back to log in</Link>
    </>
  );
}
