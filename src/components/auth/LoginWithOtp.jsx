import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { ENUMS } from "../../api/endpoint";
import { authApi } from "../../api/services";
import { loginSuccess } from "../../store/authSlice";
import { emailOnlySchema, otpLoginSchema } from "../../lib/schemas";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";

// Step 1: email -> code bhejo.  Step 2: code daalo -> login.
export default function LoginWithOtp() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);

  // POST /onboarding/send-otp  (otpType 2 = LOGIN)
  const sendOtp = useMutation({
    mutationFn: authApi.sendOtp,
    onSuccess: () => setStep(2),
  });

  // POST /onboarding/verify-otp
  const verifyOtp = useMutation({
    mutationFn: authApi.verifyOtp,
    onSuccess: (res) => dispatch(loginSuccess(res.data)),
  });

  return (
    <>
      <h2 className="mb-1 text-center text-lg font-semibold">Log in with a code</h2>
      <p className="mb-5 text-center text-sm text-mute">
        {step === 1 ? "We'll email you a one-time code." : `Enter the code sent to ${email}`}
      </p>

      {step === 1 ? (
        <Formik
          initialValues={{ email: "" }}
          validationSchema={emailOnlySchema}
          onSubmit={(v) => {
            const clean = v.email.trim().toLowerCase();
            setEmail(clean);
            sendOtp.mutate({ otpType: ENUMS.OTP_TYPE.LOGIN, email: clean });
          }}
        >
          <Form className="space-y-3">
            <FormInput name="email" type="email" placeholder="Email" />
            <Button type="submit" full loading={sendOtp.isPending}>Send code</Button>
          </Form>
        </Formik>
      ) : (
        <Formik
          initialValues={{ code: "" }}
          validationSchema={otpLoginSchema}
          onSubmit={(v) => verifyOtp.mutate({ otpType: ENUMS.OTP_TYPE.LOGIN, email, code: v.code })}
        >
          <Form className="space-y-3">
            <FormInput name="code" inputMode="numeric" placeholder="Code" />
            <Button type="submit" full loading={verifyOtp.isPending}>Log in</Button>
          </Form>
        </Formik>
      )}

      <Link to="/login" className="mt-6 block text-center text-sm font-medium text-brand">Back to log in</Link>
    </>
  );
}
