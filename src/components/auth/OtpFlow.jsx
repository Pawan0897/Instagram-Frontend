import { useState } from "react";
import { ENUMS } from "../../api/endpoint";
import { useAuth } from "../../context/AuthContext";
import { useSendOtp, useVerifyOtp } from "../../hooks/queries";
import { Input, FormError } from "../ui/Field";
import Button from "../ui/Button";

/**
 * mode="login"  -> send-otp (otpType 2) -> verify-otp -> token mil jata hai
 * mode="forgot" -> send-otp (otpType 3) -> verify-otp + new password -> password reset
 */
export default function OtpFlow({ mode = "login", onDone, onBack }) {
  const { signIn } = useAuth();
  const isForgot = mode === "forgot";
  const otpType = isForgot ? ENUMS.OTP_TYPE.FORGET : ENUMS.OTP_TYPE.LOGIN;

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const send = useSendOtp({ onSuccess: () => setStep("code") });
  const verify = useVerifyOtp({
    onSuccess: (res) => (isForgot ? onDone?.() : signIn(res.data)),
  });

  const cleanEmail = email.trim().toLowerCase();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{isForgot ? "Reset your password" : "Log in with a code"}</h2>
        <p className="mt-1 text-sm text-mute">
          {step === "email"
            ? "We'll send a one-time code to your email."
            : `Enter the code we sent to ${cleanEmail}.`}
        </p>
      </div>

      {step === "email" ? (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            send.mutate({ otpType, email: cleanEmail });
          }}
        >
          <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <FormError error={send.error} />
          <Button type="submit" full size="lg" loading={send.isPending}>
            Send code
          </Button>
        </form>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            verify.mutate({ otpType, email: cleanEmail, code, ...(isForgot && { password }) });
          }}
        >
          <Input label="Code" inputMode="numeric" required value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} />
          {isForgot && (
            <Input label="New password" type="password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} />
          )}
          <FormError error={verify.error} />
          <Button type="submit" full size="lg" loading={verify.isPending}>
            {isForgot ? "Set new password" : "Log in"}
          </Button>
          <button type="button" onClick={() => setStep("email")} className="text-sm font-medium text-brand hover:underline">
            Use a different email
          </button>
        </form>
      )}

      <button type="button" onClick={onBack} className="text-sm font-medium text-mute hover:text-ink hover:underline">
        Back to log in
      </button>
    </div>
  );
}
