"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import type { Dict } from "./translations";

type Gender = "male" | "female" | "other";
type Smoker = "yes" | "no" | "former";
type Pregnant = "yes" | "no" | "na";
type LastVisit = "under6" | "6to12" | "1to3" | "over3" | "never";
type Reason =
  | "checkup"
  | "pain"
  | "cosmetic"
  | "ortho"
  | "emergency"
  | "other";

const CONDITION_KEYS = [
  "diabetes",
  "hypertension",
  "heart",
  "asthma",
  "kidney",
  "liver",
  "thyroid",
  "epilepsy",
  "bleeding",
  "cancer",
  "hiv",
  "osteo",
  "psych",
] as const;
type ConditionKey = (typeof CONDITION_KEYS)[number];

const ISSUE_KEYS = [
  "bleedingGums",
  "sensitive",
  "grinding",
  "jawPain",
  "badBreath",
  "dryMouth",
] as const;
type IssueKey = (typeof ISSUE_KEYS)[number];

type FormState = {
  firstName: string;
  lastName: string;
  dob: string;
  gender: Gender | "";
  idNumber: string;
  occupation: string;

  phone: string;
  email: string;
  city: string;
  address: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;

  conditions: ConditionKey[];
  noneOfAbove: boolean;
  otherConditions: string;

  medications: string;
  allergies: string;
  smoker: Smoker | "";
  pregnant: Pregnant | "";

  lastVisit: LastVisit | "";
  reason: Reason | "";
  issues: IssueKey[];
  notes: string;

  consent: boolean;
  consentPrivacy: boolean;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  idNumber: "",
  occupation: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  emergencyName: "",
  emergencyPhone: "",
  emergencyRelation: "",
  conditions: [],
  noneOfAbove: false,
  otherConditions: "",
  medications: "",
  allergies: "",
  smoker: "",
  pregnant: "",
  lastVisit: "",
  reason: "",
  issues: [],
  notes: "",
  consent: false,
  consentPrivacy: false,
};

function conditionLabel(k: ConditionKey, t: Dict) {
  switch (k) {
    case "diabetes":
      return t.condDiabetes;
    case "hypertension":
      return t.condHypertension;
    case "heart":
      return t.condHeart;
    case "asthma":
      return t.condAsthma;
    case "kidney":
      return t.condKidney;
    case "liver":
      return t.condLiver;
    case "thyroid":
      return t.condThyroid;
    case "epilepsy":
      return t.condEpilepsy;
    case "bleeding":
      return t.condBleeding;
    case "cancer":
      return t.condCancer;
    case "hiv":
      return t.condHiv;
    case "osteo":
      return t.condOsteo;
    case "psych":
      return t.condPsych;
  }
}

function issueLabel(k: IssueKey, t: Dict) {
  switch (k) {
    case "bleedingGums":
      return t.issueBleedingGums;
    case "sensitive":
      return t.issueSensitive;
    case "grinding":
      return t.issueGrinding;
    case "jawPain":
      return t.issueJawPain;
    case "badBreath":
      return t.issueBadBreath;
    case "dryMouth":
      return t.issueDryMouth;
  }
}

type FieldErrors = Partial<Record<keyof FormState, true>>;

function validate(f: FormState): FieldErrors {
  const e: FieldErrors = {};
  if (!f.firstName.trim()) e.firstName = true;
  if (!f.lastName.trim()) e.lastName = true;
  if (!f.dob) e.dob = true;
  if (!f.gender) e.gender = true;
  if (!f.phone.trim()) e.phone = true;
  if (!f.city.trim()) e.city = true;
  if (!f.emergencyName.trim()) e.emergencyName = true;
  if (!f.emergencyPhone.trim()) e.emergencyPhone = true;
  if (!f.smoker) e.smoker = true;
  if (!f.pregnant) e.pregnant = true;
  if (!f.lastVisit) e.lastVisit = true;
  if (!f.reason) e.reason = true;
  if (!f.consent) e.consent = true;
  if (!f.consentPrivacy) e.consentPrivacy = true;
  return e;
}

export function IntakeForm() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const toggleCondition = (k: ConditionKey) => {
    setForm((prev) => {
      const has = prev.conditions.includes(k);
      return {
        ...prev,
        conditions: has
          ? prev.conditions.filter((c) => c !== k)
          : [...prev.conditions, k],
        noneOfAbove: has ? prev.noneOfAbove : false,
      };
    });
  };

  const toggleIssue = (k: IssueKey) => {
    setForm((prev) => ({
      ...prev,
      issues: prev.issues.includes(k)
        ? prev.issues.filter((c) => c !== k)
        : [...prev.issues, k],
    }));
  };

  const setNoneOfAbove = (checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      noneOfAbove: checked,
      conditions: checked ? [] : prev.conditions,
    }));
  };

  const maxDob = useMemo(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    const v = validate(form);
    if (Object.keys(v).length > 0) {
      setErrors(v);
      setShowErrorBanner(true);
      const firstKey = Object.keys(v)[0];
      const el = document.querySelector(`[data-field="${firstKey}"]`);
      if (el && "scrollIntoView" in el) {
        (el as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }
    setShowErrorBanner(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Submission failed");
      }
      const result = await res.json();
      router.push(`/intake/confirmation?id=${result.id}&lang=${locale}`);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Submission failed",
      );
      setSubmitting(false);
    }
  }

  const fieldErrClass = (k: keyof FormState) =>
    errors[k] ? " ring-2 ring-[var(--dental-danger)]/30 border-[var(--dental-danger)]" : "";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex-1">
      {/* Hero */}
      <section className="border-b border-[var(--dental-border)]">
        <div className="mx-auto max-w-3xl px-5 pt-10 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--dental-primary)]">
            {t.heroEyebrow}
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl leading-tight text-[var(--dental-ink)]">
            {t.heroTitle}{" "}
            <span className="italic text-[var(--dental-primary)]">
              {t.heroTitleItalic}
            </span>
          </h1>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--dental-muted)]">
            {t.heroLead}
          </p>
          <p className="mt-2 text-xs text-[var(--dental-muted)]">
            ⏱ {t.timeHint}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 py-8 space-y-8">
        {showErrorBanner && (
          <div
            role="alert"
            className="rounded-lg border border-[var(--dental-danger)]/30 bg-[var(--dental-danger)]/5 px-4 py-3 text-sm text-[var(--dental-danger)]"
          >
            {t.errorBanner}
          </div>
        )}
        {submitError && (
          <div
            role="alert"
            className="rounded-lg border border-[var(--dental-danger)]/30 bg-[var(--dental-danger)]/5 px-4 py-3 text-sm text-[var(--dental-danger)]"
          >
            {submitError}
          </div>
        )}

        {/* Section 01 — About you */}
        <section className="intake-card p-6 sm:p-8">
          <SectionHeading num={t.s1Num} title={t.s1Title} sub={t.s1Sub} />

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label={t.firstName}
              required
              error={errors.firstName}
              errLabel={t.errRequired}
            >
              <input
                type="text"
                data-field="firstName"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                autoComplete="given-name"
                className={`intake-field${fieldErrClass("firstName")}`}
              />
            </Field>
            <Field
              label={t.lastName}
              required
              error={errors.lastName}
              errLabel={t.errRequired}
            >
              <input
                type="text"
                data-field="lastName"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                autoComplete="family-name"
                className={`intake-field${fieldErrClass("lastName")}`}
              />
            </Field>
            <Field
              label={t.dob}
              required
              error={errors.dob}
              errLabel={t.errRequired}
            >
              <input
                type="date"
                data-field="dob"
                value={form.dob}
                onChange={(e) => update("dob", e.target.value)}
                max={maxDob}
                className={`intake-field${fieldErrClass("dob")}`}
              />
            </Field>
            <Field
              label={t.gender}
              required
              error={errors.gender}
              errLabel={t.errRequired}
            >
              <div data-field="gender" className="flex flex-wrap gap-2">
                <Chip
                  checked={form.gender === "male"}
                  onClick={() => update("gender", "male")}
                  label={t.genderMale}
                />
                <Chip
                  checked={form.gender === "female"}
                  onClick={() => update("gender", "female")}
                  label={t.genderFemale}
                />
                <Chip
                  checked={form.gender === "other"}
                  onClick={() => update("gender", "other")}
                  label={t.genderOther}
                />
              </div>
            </Field>
            <Field label={t.idNumber}>
              <input
                type="text"
                value={form.idNumber}
                onChange={(e) => update("idNumber", e.target.value)}
                className="intake-field"
              />
            </Field>
            <Field label={t.occupation}>
              <input
                type="text"
                value={form.occupation}
                onChange={(e) => update("occupation", e.target.value)}
                className="intake-field"
              />
            </Field>
          </div>
        </section>

        {/* Section 02 — Contact */}
        <section className="intake-card p-6 sm:p-8">
          <SectionHeading num={t.s2Num} title={t.s2Title} sub={t.s2Sub} />

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label={t.phone}
              required
              error={errors.phone}
              errLabel={t.errRequired}
            >
              <input
                type="tel"
                inputMode="tel"
                data-field="phone"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder={t.phonePlaceholder}
                autoComplete="tel"
                dir="ltr"
                className={`intake-field${fieldErrClass("phone")}`}
              />
            </Field>
            <Field label={t.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                dir="ltr"
                className="intake-field"
              />
            </Field>
            <Field
              label={t.city}
              required
              error={errors.city}
              errLabel={t.errRequired}
            >
              <input
                type="text"
                data-field="city"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                autoComplete="address-level2"
                className={`intake-field${fieldErrClass("city")}`}
              />
            </Field>
            <Field label={t.address}>
              <input
                type="text"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                autoComplete="street-address"
                className="intake-field"
              />
            </Field>
            <Field
              label={t.emergencyName}
              required
              error={errors.emergencyName}
              errLabel={t.errRequired}
            >
              <input
                type="text"
                data-field="emergencyName"
                value={form.emergencyName}
                onChange={(e) => update("emergencyName", e.target.value)}
                className={`intake-field${fieldErrClass("emergencyName")}`}
              />
            </Field>
            <Field
              label={t.emergencyPhone}
              required
              error={errors.emergencyPhone}
              errLabel={t.errRequired}
            >
              <input
                type="tel"
                data-field="emergencyPhone"
                value={form.emergencyPhone}
                onChange={(e) => update("emergencyPhone", e.target.value)}
                dir="ltr"
                className={`intake-field${fieldErrClass("emergencyPhone")}`}
              />
            </Field>
            <Field label={t.emergencyRelation}>
              <input
                type="text"
                value={form.emergencyRelation}
                onChange={(e) => update("emergencyRelation", e.target.value)}
                className="intake-field"
              />
            </Field>
          </div>
        </section>

        {/* Section 03 — General health */}
        <section className="intake-card p-6 sm:p-8">
          <SectionHeading num={t.s3Num} title={t.s3Title} sub={t.s3Sub} />

          <p className="mt-6 text-sm text-[var(--dental-ink)] font-medium">
            {t.conditionsIntro}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {CONDITION_KEYS.map((k) => (
              <Chip
                key={k}
                checked={form.conditions.includes(k)}
                onClick={() => toggleCondition(k)}
                label={conditionLabel(k, t)}
              />
            ))}
            <Chip
              checked={form.noneOfAbove}
              onClick={() => setNoneOfAbove(!form.noneOfAbove)}
              label={t.condNone}
              variant="muted"
            />
          </div>

          <div className="mt-6">
            <Field label={t.otherConditions}>
              <textarea
                rows={2}
                value={form.otherConditions}
                onChange={(e) => update("otherConditions", e.target.value)}
                placeholder={t.otherConditionsPlaceholder}
                className="intake-field resize-none"
              />
            </Field>
          </div>
        </section>

        {/* Section 04 — Meds & allergies */}
        <section className="intake-card p-6 sm:p-8">
          <SectionHeading num={t.s4Num} title={t.s4Title} sub={t.s4Sub} />

          <div className="mt-6 space-y-5">
            <Field label={t.medications}>
              <textarea
                rows={2}
                value={form.medications}
                onChange={(e) => update("medications", e.target.value)}
                placeholder={t.medicationsPlaceholder}
                className="intake-field resize-none"
              />
            </Field>
            <Field label={t.allergies}>
              <textarea
                rows={2}
                value={form.allergies}
                onChange={(e) => update("allergies", e.target.value)}
                placeholder={t.allergiesPlaceholder}
                className="intake-field resize-none"
              />
            </Field>

            <Field
              label={t.smoker}
              required
              error={errors.smoker}
              errLabel={t.errRequired}
            >
              <div data-field="smoker" className="flex flex-wrap gap-2">
                <Chip
                  checked={form.smoker === "yes"}
                  onClick={() => update("smoker", "yes")}
                  label={t.smokerYes}
                />
                <Chip
                  checked={form.smoker === "no"}
                  onClick={() => update("smoker", "no")}
                  label={t.smokerNo}
                />
                <Chip
                  checked={form.smoker === "former"}
                  onClick={() => update("smoker", "former")}
                  label={t.smokerFormer}
                />
              </div>
            </Field>

            <Field
              label={t.pregnantLabel}
              required
              error={errors.pregnant}
              errLabel={t.errRequired}
            >
              <div data-field="pregnant" className="flex flex-wrap gap-2">
                <Chip
                  checked={form.pregnant === "yes"}
                  onClick={() => update("pregnant", "yes")}
                  label={t.pregnantYes}
                />
                <Chip
                  checked={form.pregnant === "no"}
                  onClick={() => update("pregnant", "no")}
                  label={t.pregnantNo}
                />
                <Chip
                  checked={form.pregnant === "na"}
                  onClick={() => update("pregnant", "na")}
                  label={t.pregnantNA}
                />
              </div>
            </Field>
          </div>
        </section>

        {/* Section 05 — Dental history */}
        <section className="intake-card p-6 sm:p-8">
          <SectionHeading num={t.s5Num} title={t.s5Title} sub={t.s5Sub} />

          <div className="mt-6 space-y-6">
            <Field
              label={t.lastVisit}
              required
              error={errors.lastVisit}
              errLabel={t.errRequired}
            >
              <div data-field="lastVisit" className="flex flex-wrap gap-2">
                <Chip
                  checked={form.lastVisit === "under6"}
                  onClick={() => update("lastVisit", "under6")}
                  label={t.lastVisitUnder6}
                />
                <Chip
                  checked={form.lastVisit === "6to12"}
                  onClick={() => update("lastVisit", "6to12")}
                  label={t.lastVisit6to12}
                />
                <Chip
                  checked={form.lastVisit === "1to3"}
                  onClick={() => update("lastVisit", "1to3")}
                  label={t.lastVisit1to3}
                />
                <Chip
                  checked={form.lastVisit === "over3"}
                  onClick={() => update("lastVisit", "over3")}
                  label={t.lastVisitOver3}
                />
                <Chip
                  checked={form.lastVisit === "never"}
                  onClick={() => update("lastVisit", "never")}
                  label={t.lastVisitNever}
                />
              </div>
            </Field>

            <Field
              label={t.reason}
              required
              error={errors.reason}
              errLabel={t.errRequired}
            >
              <div data-field="reason" className="flex flex-wrap gap-2">
                <Chip
                  checked={form.reason === "checkup"}
                  onClick={() => update("reason", "checkup")}
                  label={t.reasonCheckup}
                />
                <Chip
                  checked={form.reason === "pain"}
                  onClick={() => update("reason", "pain")}
                  label={t.reasonPain}
                />
                <Chip
                  checked={form.reason === "cosmetic"}
                  onClick={() => update("reason", "cosmetic")}
                  label={t.reasonCosmetic}
                />
                <Chip
                  checked={form.reason === "ortho"}
                  onClick={() => update("reason", "ortho")}
                  label={t.reasonOrtho}
                />
                <Chip
                  checked={form.reason === "emergency"}
                  onClick={() => update("reason", "emergency")}
                  label={t.reasonEmergency}
                />
                <Chip
                  checked={form.reason === "other"}
                  onClick={() => update("reason", "other")}
                  label={t.reasonOther}
                />
              </div>
            </Field>

            <div>
              <p className="text-sm text-[var(--dental-ink)] font-medium">
                {t.issuesIntro}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ISSUE_KEYS.map((k) => (
                  <Chip
                    key={k}
                    checked={form.issues.includes(k)}
                    onClick={() => toggleIssue(k)}
                    label={issueLabel(k, t)}
                  />
                ))}
              </div>
            </div>

            <Field label={t.notes}>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder={t.notesPlaceholder}
                className="intake-field resize-none"
              />
            </Field>
          </div>
        </section>

        {/* Section 06 — Consent */}
        <section className="intake-card p-6 sm:p-8">
          <SectionHeading num={t.s6Num} title={t.s6Title} sub={t.s6Sub} />

          <div className="mt-6 space-y-4">
            <ConsentRow
              checked={form.consent}
              onChange={(v) => update("consent", v)}
              label={t.consent}
              error={errors.consent}
              errLabel={t.errRequired}
              fieldKey="consent"
            />
            <ConsentRow
              checked={form.consentPrivacy}
              onChange={(v) => update("consentPrivacy", v)}
              label={t.consentPrivacy}
              error={errors.consentPrivacy}
              errLabel={t.errRequired}
              fieldKey="consentPrivacy"
            />
          </div>
        </section>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="intake-btn w-full sm:w-auto sm:min-w-[220px]"
          >
            {submitting ? t.submitting : t.submit}
            <span aria-hidden className="rtl-flip">→</span>
          </button>
        </div>
      </div>
    </form>
  );
}

function SectionHeading({
  num,
  title,
  sub,
}: {
  num: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="intake-section-num">{num}</span>
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-[var(--dental-ink)] leading-tight">
          {title}
        </h2>
        <p className="mt-1 text-sm text-[var(--dental-muted)]">{sub}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  errLabel,
  children,
}: {
  label: string;
  required?: boolean;
  error?: boolean;
  errLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="intake-label">
        {label}
        {required && (
          <span
            aria-hidden
            className="ms-1 text-[var(--dental-danger)]"
          >
            *
          </span>
        )}
      </span>
      {children}
      {error && errLabel && (
        <span className="mt-1 block text-xs text-[var(--dental-danger)]">
          {errLabel}
        </span>
      )}
    </label>
  );
}

function Chip({
  checked,
  onClick,
  label,
  variant,
}: {
  checked: boolean;
  onClick: () => void;
  label: string;
  variant?: "muted";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={checked}
      data-checked={checked}
      className={`intake-chip${variant === "muted" ? " opacity-90" : ""}`}
    >
      <span
        aria-hidden
        className={`inline-block h-3.5 w-3.5 rounded-full border transition-colors ${
          checked
            ? "bg-white border-white"
            : "border-[var(--dental-border-strong)]"
        }`}
      />
      {label}
    </button>
  );
}

function ConsentRow({
  checked,
  onChange,
  label,
  error,
  errLabel,
  fieldKey,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  error?: boolean;
  errLabel?: string;
  fieldKey: string;
}) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          data-field={fieldKey}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 accent-[var(--dental-primary)] cursor-pointer"
        />
        <span className="text-sm leading-relaxed text-[var(--dental-ink)]">
          {label}
        </span>
      </label>
      {error && errLabel && (
        <p className="mt-1 ms-8 text-xs text-[var(--dental-danger)]">
          {errLabel}
        </p>
      )}
    </div>
  );
}
