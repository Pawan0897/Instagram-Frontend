import { useState } from "react";
import { ENUMS } from "../../api/endpoint";
import { useAuth } from "../../context/AuthContext";
import {
  useChangePassword,
  useDeleteAccount,
  useSaveAddress,
  useSendOtpToUpdate,
  useUpdateProfile,
  useVerifyOtpToUpdate,
} from "../../hooks/queries";
import Button from "../ui/Button";
import { FormError, Input } from "../ui/Field";
import Modal from "../ui/Modal";

export function Section({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-line bg-card">
      <div className="border-b border-line px-5 py-4">
        <h2 className="font-semibold">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-mute">{description}</p>
        )}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

/* PUT /onboarding/user {socialAccount} */
export function PrivacyToggle() {
  const { user } = useAuth();
  const update = useUpdateProfile();
  const isPrivate = user?.socialAccount === ENUMS.SOCIAL_ACCOUNT.PRIVATE;

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-medium">Private account</p>
        <p className="text-sm text-mute">
          {isPrivate
            ? "People need your approval before they can follow you."
            : "Anyone can follow you and see your posts in their feed."}
        </p>
      </div>
      <button
        role="switch"
        aria-checked={isPrivate}
        aria-label="Private account"
        disabled={update.isPending}
        onClick={() =>
          update.mutate({
            socialAccount: isPrivate
              ? ENUMS.SOCIAL_ACCOUNT.PUBLIC
              : ENUMS.SOCIAL_ACCOUNT.PRIVATE,
          })
        }
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors disabled:opacity-60 ${isPrivate ? "bg-brand" : "bg-ink/20"}`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${isPrivate ? "left-[22px]" : "left-0.5"}`}
        />
      </button>
    </div>
  );
}

/* POST /onboarding/change-password */
export function ChangePasswordForm() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const change = useChangePassword({
    onSuccess: () => setForm({ oldPassword: "", newPassword: "" }),
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        change.mutate(form);
      }}
    >
      <Input
        label="Current password"
        type="password"
        autoComplete="current-password"
        required
        value={form.oldPassword}
        onChange={set("oldPassword")}
      />
      <Input
        label="New password"
        type="password"
        autoComplete="new-password"
        minLength={6}
        required
        value={form.newPassword}
        onChange={set("newPassword")}
      />
      <FormError error={change.error} />
      <Button type="submit" loading={change.isPending}>
        Update password
      </Button>
    </form>
  );
}

/* POST /onboarding/send-otp-to-update  ->  POST /onboarding/verify-otp-to-update */
export function ChangeEmailForm() {
  const { user } = useAuth();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const clean = email.trim().toLowerCase();

  const send = useSendOtpToUpdate({ onSuccess: () => setStep("code") });
  const verify = useVerifyOtpToUpdate({
    onSuccess: () => {
      setStep("email");
      setEmail("");
      setCode("");
    },
  });

  return step === "email" ? (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        send.mutate(clean);
      }}
    >
      <p className="text-sm text-mute">
        Current email:{" "}
        <span className="font-medium text-ink">{user?.email}</span>
      </p>
      <Input
        label="New email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormError error={send.error} />
      <Button type="submit" loading={send.isPending}>
        Send code
      </Button>
    </form>
  ) : (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        verify.mutate({ email: clean, code });
      }}
    >
      <Input
        label={`Code sent to ${clean}`}
        inputMode="numeric"
        required
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
      />
      <FormError error={verify.error} />
      <div className="flex gap-2">
        <Button type="submit" loading={verify.isPending}>
          Verify and update
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setStep("email")}
        >
          Back
        </Button>
      </div>
    </form>
  );
}

/* POST /address/addresses {pinCode, number, userId} */
export function AddressForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({ pinCode: "", number: "" });
  const save = useSaveAddress({
    onSuccess: () => setForm({ pinCode: "", number: "" }),
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate({ ...form, userId: user?._id });
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="PIN code"
          required
          value={form.pinCode}
          onChange={set("pinCode")}
        />
        <Input
          label="Contact number"
          type="number"
          required
          value={form.number}
          onChange={set("number")}
        />
      </div>
      <FormError error={save.error} />
      <Button type="submit" loading={save.isPending}>
        Save address
      </Button>
    </form>
  );
}

/* DELETE /onboarding */
export function DeleteAccount() {
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const del = useDeleteAccount({ onSuccess: () => signOut() });

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium">Delete account</p>
          <p className="text-sm text-mute">
            Your profile will be removed and you'll be logged out.
          </p>
        </div>
        <Button
          variant="outline"
          className="!border-heart/40 !text-heart"
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete your account?"
      >
        <div className="space-y-4 p-5">
          <p className="text-sm text-mute">
            This signs you out everywhere and can't be undone from the app.
          </p>
          <FormError error={del.error} />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Keep account
            </Button>
            <Button
              variant="danger"
              loading={del.isPending}
              onClick={() => del.mutate()}
            >
              Delete account
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
