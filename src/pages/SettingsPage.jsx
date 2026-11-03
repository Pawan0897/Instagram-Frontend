import AddressForm from "../components/settings/AddressForm";
import DeleteAccount from "../components/settings/DeleteAccount";
import EmailForm from "../components/settings/EmailForm";
import PasswordForm from "../components/settings/PasswordForm";
import PrivacySwitch from "../components/settings/PrivacySwitch";

function Section({ title, children }) {
  return (
    <section className="vs-card">
      <h2 className="border-b border-[var(--line)] px-5 py-3 font-bold">{title}</h2>
      <div className="p-5">{children}</div>
    </section>
  );
}

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-xl space-y-5">
      <h1 className="page-title">Settings</h1>
      <Section title="Privacy"><PrivacySwitch /></Section>
      <Section title="Password"><PasswordForm /></Section>
      <Section title="Email"><EmailForm /></Section>
      <Section title="Address"><AddressForm /></Section>
      <Section title="Account"><DeleteAccount /></Section>
    </div>
  );
}
