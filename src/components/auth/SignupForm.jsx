import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { ENUMS } from "../../api/endpoint";
import { authApi, profileApi } from "../../api/services";
import { loginSuccess, setUser } from "../../store/authSlice";
import { otpLoginSchema, signupSchema } from "../../lib/schemas";
import { removeEmpty } from "../../lib/format";
import { notify } from "../../lib/alert";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";

/**
 * Is backend me POST /onboarding/signup nahi hai. Signup OTP se hota hai:
 *   Step 1: POST /onboarding/send-otp    { otpType: 1, email }
 *   Step 2: POST /onboarding/verify-otp  { otpType: 1, email, code, password }  -> user ban jata hai + token
 *   Step 3: PUT  /onboarding/user        { firstName, lastName }                -> naam save (verify-otp naam nahi leta)
 */
export default function SignupForm() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(null); // step 1 ki values

  const sendOtp = useMutation({
    mutationFn: authApi.sendOtp,
    onSuccess: () => setStep(2),
  });

  const verify = useMutation({
    mutationFn: async (code) => {
      const res = await authApi.verifyOtp({
        otpType: ENUMS.OTP_TYPE.SIGNUP,
        email: form.email,
        password: form.password,
        code,
      });
      dispatch(loginSuccess(res.data)); // token ab localStorage me hai
      const names = removeEmpty({ firstName: form.firstName, lastName: form.lastName });
      const updated = await profileApi.update(names);
      dispatch(setUser(updated.data));
      notify.success("Welcome to Frame");
    },
  });

  return (
    <>
      <p className="mb-5 text-center text-[15px] font-semibold text-mute">
        {step === 1 ? "Sign up to see photos from your friends." : `Enter the code sent to ${form.email}`}
      </p>

      {step === 1 ? (
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
          validationSchema={signupSchema}
          onSubmit={(values) => {
            const clean = { ...values, email: values.email.trim().toLowerCase() };
            setForm(clean);
            sendOtp.mutate({ otpType: ENUMS.OTP_TYPE.SIGNUP, email: clean.email });
          }}
        >
          <Form className="space-y-3">
            <FormInput name="firstName" placeholder="First name" />
            <FormInput name="lastName" placeholder="Last name (optional)" />
            <FormInput name="email" type="email" placeholder="Email" autoComplete="email" />
            <FormInput name="password" type="password" placeholder="Password (min 6)" autoComplete="new-password" />
            <Button type="submit" full loading={sendOtp.isPending}>Send code</Button>
          </Form>
        </Formik>
      ) : (
        <Formik
          initialValues={{ code: "" }}
          validationSchema={otpLoginSchema}
          onSubmit={(v) => verify.mutate(v.code)}
        >
          <Form className="space-y-3">
            <FormInput name="code" inputMode="numeric" placeholder="Code" />
            <Button type="submit" full loading={verify.isPending}>Create account</Button>
            <Button type="button" light full onClick={() => setStep(1)}>Back</Button>
          </Form>
        </Formik>
      )}

      <p className="mt-6 border-t border-line pt-5 text-center text-sm">
        Have an account? <Link to="/login" className="font-semibold text-brand">Log in</Link>
      </p>
    </>
  );
}
