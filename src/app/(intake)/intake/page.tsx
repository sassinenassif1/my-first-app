import { LocaleProvider } from "./LocaleProvider";
import { IntakeHeader } from "./IntakeHeader";
import { IntakeForm } from "./IntakeForm";

export const metadata = {
  title: "Patient Intake — Noor Dental Clinic",
  description:
    "Bilingual patient intake form for Noor Dental Clinic. Available in English and Arabic.",
};

export default function IntakePage() {
  return (
    <LocaleProvider>
      <IntakeHeader />
      <IntakeForm />
    </LocaleProvider>
  );
}
