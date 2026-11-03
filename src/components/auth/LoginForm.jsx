import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { authApi } from "../../api/services";
import { loginSuccess } from "../../store/authSlice";
import { loginSchema } from "../../lib/schemas";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";

export default function LoginForm() {
  const dispatch = useDispatch();

  // POST /onboarding/login
  const login = useMutation({
    mutationFn: authApi.login,
    onSuccess: (res) => dispatch(loginSuccess(res.data)),
  });

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => login.mutate({ ...values, email: values.email.trim().toLowerCase() })}
      >
        <Form className="space-y-3">
          <FormInput name="email" type="email" placeholder="Email" autoComplete="email" />
          <FormInput name="password" type="password" placeholder="Password" autoComplete="current-password" />
          <Button type="submit" full loading={login.isPending}>Log in</Button>
        </Form>
      </Formik>

      <div className="mt-5 space-y-2 text-center text-sm">
        <Link to="/login-otp" className="block font-medium text-[var(--color-brand)] hover:underline">Log in with a code</Link>
        <Link to="/forgot-password" className="block text-[var(--muted)] hover:underline">Forgot password?</Link>
      </div>
      <p className="mt-6 border-t border-[var(--line)] pt-5 text-center text-sm">
        Don't have an account? <Link to="/signup" className="font-semibold text-[var(--color-brand)]">Sign up</Link>
      </p>
    </>
  );
}
