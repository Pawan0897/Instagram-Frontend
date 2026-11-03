import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { ENUMS } from "../../api/endpoint";
import { profileApi } from "../../api/services";
import { setUser } from "../../store/authSlice";
import { closeModal } from "../../store/uiSlice";
import { notify } from "../../lib/alert";
import { removeEmpty } from "../../lib/format";
import { profileSchema } from "../../lib/schemas";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import Modal from "../ui/Modal";

export default function EditProfileModal() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  // PUT /onboarding/user
  const update = useMutation({
    mutationFn: profileApi.update,
    onSuccess: (res) => {
      dispatch(setUser(res.data));
      notify.success(res.message);
      dispatch(closeModal());
    },
  });

  const initialValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    userName: user.userName || "",
    image: user.image || "",
    gender: user.gender ?? "",
    dob: user.dob ? String(user.dob).slice(0, 10) : "",
    location: user.location || "",
    qualification: user.qualification || "",
    studyPreferences: user.studyPreferences ?? "",
  };

  function submit(values) {
    const body = removeEmpty(values); // Joi empty string reject karti hai
    if (body.gender !== undefined) body.gender = Number(body.gender);
    if (body.studyPreferences !== undefined) body.studyPreferences = Number(body.studyPreferences);
    update.mutate(body);
  }

  return (
    <Modal title="Edit profile">
      <Formik initialValues={initialValues} validationSchema={profileSchema} onSubmit={submit}>
        <Form className="space-y-4 p-4">
          <div className="grid grid-cols-2 gap-3">
            <FormInput name="firstName" label="First name" />
            <FormInput name="lastName" label="Last name" />
          </div>
          <FormInput name="userName" label="Username" />
          <FormInput name="image" label="Photo URL" placeholder="https://" />
          <div className="grid grid-cols-2 gap-3">
            <FormInput name="gender" label="Gender" as="select">
              <option value="">Prefer not to say</option>
              <option value={ENUMS.GENDER.MALE}>Male</option>
              <option value={ENUMS.GENDER.FEMALE}>Female</option>
              <option value={ENUMS.GENDER.OTHER}>Other</option>
            </FormInput>
            <FormInput name="dob" label="Birthday" type="date" />
          </div>
          <FormInput name="location" label="Location" />
          <FormInput name="qualification" label="Qualification" />
          <FormInput name="studyPreferences" label="Study interest" as="select">
            <option value="">Not set</option>
            {Object.entries(ENUMS.STUDY_PREFERENCES).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </FormInput>
          <Button type="submit" full loading={update.isPending}>Save</Button>
        </Form>
      </Formik>
    </Modal>
  );
}
