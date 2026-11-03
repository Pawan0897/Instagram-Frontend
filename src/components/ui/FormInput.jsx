import { useField } from "formik";

/**
 * Formik + Yup wala input. Sirf `name` aur `label` do — value, onChange, error sab Formik se.
 *   <FormInput name="email" label="Email" type="email" />
 *   <FormInput name="bio" label="Bio" as="textarea" rows={3} />
 *   <FormInput name="gender" label="Gender" as="select"><option>..</option></FormInput>
 */
export default function FormInput({ label, as: Tag = "input", children, ...rest }) {
  const [field, meta] = useField(rest);
  const error = meta.touched && meta.error;

  return (
    <div>
      {label && <label htmlFor={rest.name} className="mb-1 block text-sm font-medium">{label}</label>}
      <Tag id={rest.name} {...field} {...rest} className={`input ${error ? "input-error" : ""}`}>
        {children}
      </Tag>
      {error && <p className="mt-1 text-xs text-heart">{meta.error}</p>}
    </div>
  );
}
