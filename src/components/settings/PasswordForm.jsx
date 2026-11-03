import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { authApi } from "../../api/services";
import { notify } from "../../lib/alert";
import { passwordSchema } from "../../lib/schemas";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";

export default function PasswordForm() {
  // POST /onboarding/change-password
  const change = useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: (res) => notify.success(res.message),
  });

  return (
    <Formik
      initialValues={{ oldPassword: "", newPassword: "" }}
      validationSchema={passwordSchema}
      onSubmit={(values, { resetForm }) => change.mutate(values, { onSuccess: () => resetForm() })}
    >
      <Form className="space-y-4">
        <FormInput name="oldPassword" type="password" label="Current password" autoComplete="current-password" />
        <FormInput name="newPassword" type="password" label="New password" autoComplete="new-password" />
        <Button type="submit" loading={change.isPending}>Update password</Button>
      </Form>
    </Formik>
  );
}
