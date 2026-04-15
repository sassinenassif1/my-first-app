"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import type { Dict } from "./translations";

type Gender = "male" | "female" | "other";
type Smoker = "yes" | "no" | "former";
type Pregnant = "yes" | "no" | "na";

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

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
  gender: Gender | "";
  city: string;

  conditions: ConditionKey[];
  noneOfAbove: boolean;
  otherConditions: string;
  medications: string;
  allergies: string;
  smoker: Smoker | "";
  pregnant: Pregnant | "";

  consent: boolean;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  dob: "",
  gender: "",
  city: "",
  conditions: [],
  noneOfAbove: false,
  otherConditions: "",
  medications: "",
  allergies: "",
  smoker: "",
  pregnant: "",
  consent: false,
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

type FieldErrors = Partial<Record<keyof FormState, true>>;

function validate(f: FormState): FieldErrors {
  const e: FieldErrors = {};
  if (!f.firstName.trim()) e.firstName = true;
  if (!f.lastName.trim()) e.lastName = true;
  if (!f.phone.trim()) e.phone = true;
  if (!f.dob) e.dob = true;
  if (!f.gender) e.gender = true;
  if (!f.city.trim()) e.city = true;
  if (!f.smoker) e.smoker = true;
  if (!f.pregnant) e.pregnant = true;
  if (!f.consent) e.consent = true;
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

  const setNoneOfAbove = (checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      noneOfAbove: checked,
      conditions: checked ? [] : prev.conditions,
    }));
  };

  const maxDob = useMemo(() => {
    return new Date().toISOString().split("T")[0];
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
      setSubmitError(err instanceof Error ? err.message : "Submission failed");
      setSubmitting(false);
    }
  }

  const errClass = (k: keyof FormState) =>
    errors[k]
      ? " ring-2 ring-[var(--dental-danger)]/30 border-[var(--dental-danger)]"
      : "";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex-1 pb-24">
      {/* Hero — compact on mobile */}
      <section className="border-b border-[var(--dental-border)] bg-[var(--dental-surface)]">
        <div className="mx-auto max-w-xl px-5 pt-6 pb-5">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--dental-primary)]">
            {t.heroEyebrow}
          </p>
          <h1 className="mt-2 font-serif text-[1.75rem] leading-[1.15] text-[var(--dental-ink)] sm:text-3xl">
            {t.heroTitle}{" "}
            <span className="italic text-[var(--dental-primary)]">
              {t.heroTitleItalic}
            </span>
          </h1>
          <p className="mt-3 text-[0.95rem] leading-snug text-[var(--dental-muted)]">
            {t.heroLead}
          </p>
          <p className="mt-2 text-xs text-[var(--dental-muted)]">
            ⏱ {t.timeHint}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-xl px-4 py-5 space-y-5 sm:px-5 sm:py-7 sm:space-y-6">
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

        {/* Section 1 — About you */}
        <section className="intake-card p-4 sm:p-6">
          <SectionHeading num={t.s1Num} title={t.s1Title} sub={t.s1Sub} />

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                autoCapitalize="words"
                className={`intake-field${errClass("firstName")}`}
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
                autoCapitalize="words"
                className={`intake-field${errClass("lastName")}`}
              />
            </Field>
            <div className="sm:col-span-2">
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
                  className={`intake-field${errClass("phone")}`}
                />
              </Field>
            </div>
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
                className={`intake-field${errClass("dob")}`}
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
                autoCapitalize="words"
                className={`intake-field${errClass("city")}`}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                label={t.gender}
                required
                error={errors.gender}
                errLabel={t.errRequired}
              >
                <div
                  data-field="gender"
                  role="radiogroup"
                  className="grid grid-cols-3 gap-2"
                >
                  <PillRadio
                    checked={form.gender === "male"}
                    onClick={() => update("gender", "male")}
                    label={t.genderMale}
                  />
                  <PillRadio
                    checked={form.gender === "female"}
                    onClick={() => update("gender", "female")}
                    label={t.genderFemale}
                  />
                  <PillRadio
                    checked={form.gender === "other"}
                    onClick={() => update("gender", "other")}
                    label={t.genderOther}
                  />
                </div>
              </Field>
            </div>
          </div>
        </section>

        {/* Section 2 — Health background */}
        <section className="intake-card p-4 sm:p-6">
          <SectionHeading num={t.s2Num} title={t.s2Title} sub={t.s2Sub} />

          <div className="mt-5 space-y-5">
            <div>
              <p className="intake-label">{t.conditionsIntro}</p>
              <div className="mt-2 flex flex-wrap gap-2">
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
                />
              </div>
            </div>

            <Field label={t.otherConditions}>
              <textarea
                rows={2}
                value={form.otherConditions}
                onChange={(e) => update("otherConditions", e.target.value)}
                placeholder={t.otherConditionsPlaceholder}
                className="intake-field resize-none"
              />
            </Field>

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
              <div
                data-field="smoker"
                role="radiogroup"
                className="grid grid-cols-3 gap-2"
              >
                <PillRadio
                  checked={form.smoker === "yes"}
                  onClick={() => update("smoker", "yes")}
                  label={t.smokerYes}
                />
                <PillRadio
                  checked={form.smoker === "no"}
                  onClick={() => update("smoker", "no")}
                  label={t.smokerNo}
                />
                <PillRadio
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
              <div
                data-field="pregnant"
                role="radiogroup"
                className="grid grid-cols-3 gap-2"
              >
                <PillRadio
                  checked={form.pregnant === "yes"}
                  onClick={() => update("pregnant", "yes")}
                  label={t.pregnantYes}
                />
                <PillRadio
                  checked={form.pregnant === "no"}
                  onClick={() => update("pregnant", "no")}
                  label={t.pregnantNo}
                />
                <PillRadio
                  checked={form.pregnant === "na"}
                  onClick={() => update("pregnant", "na")}
                  label={t.pregnantNA}
                />
              </div>
            </Field>
          </div>
        </section>

        {/* Section 3 — Consent */}
        <section className="intake-card p-4 sm:p-6">
          <SectionHeading num={t.s3Num} title={t.s3Title} sub={t.s3Sub} />

          <label className="mt-5 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              data-field="consent"
              checked={form.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-[var(--dental-primary)] cursor-pointer"
            />
            <span className="text-[0.95rem] leading-relaxed text-[var(--dental-ink)]">
              {t.consent}
            </span>
          </label>
          {errors.consent && (
            <p className="mt-2 ms-8 text-xs text-[var(--dental-danger)]">
              {t.errRequired}
            </p>
          )}
        </section>

        <button
          type="submit"
          disabled={submitting}
          className="intake-btn w-full text-base"
        >
          {submitting ? t.submitting : t.submit}
          <span aria-hidden className="rtl-flip">→</span>
        </button>
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
    <div className="flex items-start gap-3">
      <span className="intake-section-num">{num}</span>
      <div className="min-w-0">
        <h2 className="font-serif text-xl text-[var(--dental-ink)] leading-tight sm:text-2xl">
          {title}
        </h2>
        {sub && (
          <p className="mt-0.5 text-xs text-[var(--dental-muted)] sm:text-sm">
            {sub}
          </p>
        )}
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
          <span aria-hidden className="ms-1 text-[var(--dental-danger)]">
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

function PillRadio({
  checked,
  onClick,
  label,
}: {
  checked: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onClick}
      className={`min-h-11 rounded-lg border px-3 text-sm font-medium transition-colors ${
        checked
          ? "border-[var(--dental-primary)] bg-[var(--dental-primary)] text-white"
          : "border-[var(--dental-border-strong)] bg-[var(--dental-surface)] text-[var(--dental-ink)] hover:border-[var(--dental-primary)]"
      }`}
    >
      {label}
    </button>
  );
}

function Chip({
  checked,
  onClick,
  label,
}: {
  checked: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={checked}
      data-checked={checked}
      className="intake-chip"
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
