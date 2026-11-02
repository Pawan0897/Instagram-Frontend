import {
  AddressForm, ChangeEmailForm, ChangePasswordForm, DeleteAccount, PrivacyToggle, Section,
} from "../components/profile/SettingsSections";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-xl space-y-5">
      <h1 className="text-xl font-semibold">Settings</h1>
      <Section title="Privacy"><PrivacyToggle /></Section>
      <Section title="Password" description="Use at least 6 characters."><ChangePasswordForm /></Section>
      <Section title="Email" description="We'll email a code to confirm the new address."><ChangeEmailForm /></Section>
      <Section title="Address"><AddressForm /></Section>
      <Section title="Danger zone"><DeleteAccount /></Section>
    </div>
  );
}
