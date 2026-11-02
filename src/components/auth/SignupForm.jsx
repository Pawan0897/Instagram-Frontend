import { useState } from "react";
import { useSignup } from "../../hooks/queries";
import { useAuth } from "../../context/AuthContext";
import { Input, FormError } from "../ui/Field";
import Button from "../ui/Button";

export default function SignupForm() {
  const { signIn } = useAuth();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", countryCode: "+91", phone: "",
  });
  const signup = useSignup({ onSuccess: (res) => signIn(res.data) });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const { phone, countryCode, lastName, ...rest } = form;
    signup.mutate({
      ...rest,
      email: rest.email.trim().toLowerCase(),
      ...(lastName && { lastName }),
      ...(phone && { phone, countryCode }), // phone ke saath countryCode bhi bhejna hai
    });
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div className="grid grid-cols-2 gap-3">
        <Input label="First name" required value={form.firstName} onChange={set("firstName")} />
        <Input label="Last name" value={form.lastName} onChange={set("lastName")} />
      </div>
      <Input label="Email" type="email" autoComplete="email" required value={form.email} onChange={set("email")} />
      <Input label="Password" type="password" minLength={6} autoComplete="new-password" required value={form.password} onChange={set("password")} hint="At least 6 characters." />
      <div className="grid grid-cols-[88px_1fr] gap-3">
        <Input label="Code" value={form.countryCode} onChange={set("countryCode")} />
        <Input label="Phone (optional)" inputMode="numeric" value={form.phone} onChange={set("phone")} />
      </div>
      <FormError error={signup.error} />
      <Button type="submit" full size="lg" loading={signup.isPending}>
        Create account
      </Button>
    </form>
  );
}
