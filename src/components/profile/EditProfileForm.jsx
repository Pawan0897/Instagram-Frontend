import { useState } from "react";
import { ENUMS } from "../../api/endpoint";
import { useUpdateProfile } from "../../hooks/queries";
import Button from "../ui/Button";
import { FormError, Input, Select } from "../ui/Field";

const text = ["firstName", "lastName", "userName", "location", "qualification", "grades", "workExperience", "image"];

export default function EditProfileForm({ user, onDone }) {
  const [form, setForm] = useState({
    ...Object.fromEntries(text.map((k) => [k, user?.[k] ?? ""])),
    gender: user?.gender ?? "",
    dob: user?.dob ? String(user.dob).slice(0, 10) : "",
    studyPreferences: user?.studyPreferences ?? "",
  });
  const update = useUpdateProfile({ onSuccess: onDone });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    // Backend Joi empty string reject karta hai (image ko chhodkar) -> sirf filled fields bhejo
    const body = {};
    text.forEach((k) => form[k].trim() && (body[k] = form[k].trim()));
    if (form.dob) body.dob = form.dob;
    if (form.gender !== "") body.gender = Number(form.gender);
    if (form.studyPreferences !== "") body.studyPreferences = Number(form.studyPreferences);
    update.mutate(body);
  };

  return (
    <form className="space-y-4 p-4" onSubmit={submit}>
      <div className="grid grid-cols-2 gap-3">
        <Input label="First name" value={form.firstName} onChange={set("firstName")} />
        <Input label="Last name" value={form.lastName} onChange={set("lastName")} />
      </div>
      <Input label="Username" value={form.userName} onChange={set("userName")} hint="Shown on your posts." />
      <Input label="Photo URL" type="url" value={form.image} onChange={set("image")} placeholder="https://" />
      <div className="grid grid-cols-2 gap-3">
        <Select label="Gender" value={form.gender} onChange={set("gender")}>
          <option value="">Prefer not to say</option>
          <option value={ENUMS.GENDER.MALE}>Male</option>
          <option value={ENUMS.GENDER.FEMALE}>Female</option>
          <option value={ENUMS.GENDER.OTHER}>Other</option>
        </Select>
        <Input label="Birthday" type="date" value={form.dob} onChange={set("dob")} />
      </div>
      <Input label="Location" value={form.location} onChange={set("location")} />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Qualification" value={form.qualification} onChange={set("qualification")} />
        <Input label="Grades" value={form.grades} onChange={set("grades")} />
      </div>
      <Input label="Work experience" value={form.workExperience} onChange={set("workExperience")} />
      <Select label="Study interest" value={form.studyPreferences} onChange={set("studyPreferences")}>
        <option value="">Not set</option>
        {Object.entries(ENUMS.STUDY_PREFERENCES).map(([v, label]) => (
          <option key={v} value={v}>{label}</option>
        ))}
      </Select>
      <FormError error={update.error} />
      <Button type="submit" full size="lg" loading={update.isPending}>Save profile</Button>
    </form>
  );
}
