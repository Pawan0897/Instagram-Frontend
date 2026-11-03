import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { profileApi } from "../../api/services";
import { notify } from "../../lib/alert";
import { newEmailSchema, verifyEmailSchema } from "../../lib/schemas";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";

// Step 1: naya email -> code.  Step 2: code verify -> email update.
export default function EmailForm() {
  const user = useSelector((s) => s.auth.user);
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);

  // POST /onboarding/send-otp-to-update
  const sendCode = useMutation({
    mutationFn: profileApi.sendOtpToUpdate,
    onSuccess: () => setStep(2),
  });

  // POST /onboarding/verify-otp-to-update
  const verify = useMutation({
    mutationFn: profileApi.verifyOtpToUpdate,
    onSuccess: (res) => {
      notify.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      setStep(1);
    },
  });

  if (step === 1) {
    return (
      <Formik
        initialValues={{ email: "" }}
        validationSchema={newEmailSchema}
        onSubmit={(v) => {
          const clean = v.email.trim().toLowerCase();
          setEmail(clean);
          sendCode.mutate(clean);
        }}
      >
        <Form className="space-y-4">
          <p className="text-sm text-mute">Current email: <span className="font-medium text-ink">{user.email}</span></p>
          <FormInput name="email" type="email" label="New email" />
          <Button type="submit" loading={sendCode.isPending}>Send code</Button>
        </Form>
      </Formik>
    );
  }

  return (
    <Formik
      initialValues={{ code: "" }}
      validationSchema={verifyEmailSchema}
      onSubmit={(v) => verify.mutate({ email, code: v.code })}
    >
      <Form className="space-y-4">
        <FormInput name="code" inputMode="numeric" label={`Code sent to ${email}`} />
        <div className="flex gap-2">
          <Button type="submit" loading={verify.isPending}>Verify</Button>
          <Button type="button" light onClick={() => setStep(1)}>Back</Button>
        </div>
      </Form>
    </Formik>
  );
}
