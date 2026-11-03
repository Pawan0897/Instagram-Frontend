import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { addressApi } from "../../api/services";
import { notify } from "../../lib/alert";
import { addressSchema } from "../../lib/schemas";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";

export default function AddressForm() {
  const user = useSelector((s) => s.auth.user);

  // POST /address/addresses { pinCode, number, userId }
  const save = useMutation({
    mutationFn: addressApi.save,
    onSuccess: (res) => notify.success(res.message || "Address saved"),
  });

  return (
    <Formik
      initialValues={{ pinCode: "", number: "" }}
      validationSchema={addressSchema}
      onSubmit={(values, { resetForm }) =>
        save.mutate({ ...values, userId: user._id }, { onSuccess: () => resetForm() })
      }
    >
      <Form className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormInput name="pinCode" label="PIN code" inputMode="numeric" />
          <FormInput name="number" label="Contact number" inputMode="numeric" />
        </div>
        <Button type="submit" loading={save.isPending}>Save address</Button>
      </Form>
    </Formik>
  );
}
