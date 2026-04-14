import { Suspense } from "react";
import { LocaleProvider } from "../LocaleProvider";
import { IntakeHeader } from "../IntakeHeader";
import { ConfirmationContent } from "./ConfirmationContent";

export const metadata = {
  title: "Form received — Noor Dental Clinic",
};

export default function ConfirmationPage() {
  return (
    <LocaleProvider>
      <IntakeHeader />
      <Suspense fallback={null}>
        <ConfirmationContent />
      </Suspense>
    </LocaleProvider>
  );
}
