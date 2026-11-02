import { useState } from "react";
import { useLogin } from "../../hooks/queries";
import { useAuth } from "../../context/AuthContext";
import { Input, FormError } from "../ui/Field";
import Button from "../ui/Button";

export default function LoginForm({ onForgot, onOtp }) {
  const { signIn } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const login = useLogin({ success: false, onSuccess: (res) => signIn(res.data) });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        login.mutate({ email: form.email.trim().toLowerCase(), password: form.password });
      }}
    >
      <Input label="Email" type="email" autoComplete="email" required value={form.email} onChange={set("email")} placeholder="you@example.com" />
      <Input label="Password" type="password" autoComplete="current-password" required value={form.password} onChange={set("password")} />
      <FormError error={login.error} />
      <Button type="submit" full size="lg" loading={login.isPending}>
        Log in
      </Button>
      <div className="flex items-center justify-between text-sm">
        <button type="button" onClick={onOtp} className="font-medium text-brand hover:underline">
          Log in with a code
        </button>
        <button type="button" onClick={onForgot} className="font-medium text-mute hover:text-ink hover:underline">
          Forgot password?
        </button>
      </div>
    </form>
  );
}
