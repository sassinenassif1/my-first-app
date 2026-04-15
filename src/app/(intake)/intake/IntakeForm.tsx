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

  const isErr = (k: keyof FormState) => Boolean(errors[k]);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex-1 pb-24">
      {/* Masthead/hero — reads like the top of a paper form */}
      <section className="border-b border-[var(--ink-line)]">
        <div className="mx-auto max-w-xl px-5 pt-8 pb-7">
          <p className="intake-section-label">{t.heroEyebrow}</p>
          <h1 className="intake-serif mt-3 text-[1.9rem] leading-[1.12] tracking-[-0.01em] text-[var(--ink)] sm:text-[2.15rem]">
            {t.heroTitle}{" "}
            <span className="italic text-[var(--chart-red)]">
              {t.heroTitleItalic}
            </span>
          </h1>
          <p className="mt-4 text-[0.97rem] leading-relaxed text-[var(--ink-muted)]">
            {t.heroLead}
          </p>
          <p className="intake-serif mt-3 text-sm italic text-[var(--ink-faint)]">
            {t.timeHint}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-xl px-4 py-6 space-y-6 sm:px-5 sm:py-8 sm:space-y-7">
        {showErrorBanner && (
          <div role="alert" className="intake-note">
            {t.errorBanner}
          </div>
        )}
        {submitError && (
          <div role="alert" className="intake-note">
            {submitError}
          </div>
        )}

        {/* Section 1 — About you */}
        <section className="intake-card">
          <SectionHeading num={t.s1Num} title={t.s1Title} sub={t.s1Sub} />

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label={t.firstName}
              required
              error={isErr("firstName")}
              errLabel={t.errRequired}
            >
              <input
                type="text"
                data-field="firstName"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                autoComplete="given-name"
                autoCapitalize="words"
                className={`intake-field${isErr("firstName") ? " is-error" : ""}`}
              />
            </Field>
            <Field
              label={t.lastName}
              required
              error={isErr("lastName")}
              errLabel={t.errRequired}
            >
              <input
                type="text"
                data-field="lastName"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                autoComplete="family-name"
                autoCapitalize="words"
                className={`intake-field${isErr("lastName") ? " is-error" : ""}`}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                label={t.phone}
                required
                error={isErr("phone")}
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
                  className={`intake-field${isErr("phone") ? " is-error" : ""}`}
                />
              </Field>
            </div>
            <Field
              label={t.dob}
              required
              error={isErr("dob")}
              errLabel={t.errRequired}
            >
              <input
                type="date"
                data-field="dob"
                value={form.dob}
                onChange={(e) => update("dob", e.target.value)}
                max={maxDob}
                className={`intake-field${isErr("dob") ? " is-error" : ""}`}
              />
            </Field>
            <Field
              label={t.city}
              required
              error={isErr("city")}
              errLabel={t.errRequired}
            >
              <input
                type="text"
                data-field="city"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                autoComplete="address-level2"
                autoCapitalize="words"
                className={`intake-field${isErr("city") ? " is-error" : ""}`}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                label={t.gender}
                required
                error={isErr("gender")}
                errLabel={t.errRequired}
              >
                <SegmentGroup
                  name="gender"
                  error={isErr("gender")}
                  value={form.gender}
                  onChange={(v) => update("gender", v as Gender)}
                  options={[
                    { value: "male", label: t.genderMale },
                    { value: "female", label: t.genderFemale },
                    { value: "other", label: t.genderOther },
                  ]}
                />
              </Field>
            </div>
          </div>
        </section>

        {/* Section 2 — Health background */}
        <section className="intake-card">
          <SectionHeading num={t.s2Num} title={t.s2Title} sub={t.s2Sub} />

          <div className="mt-6 space-y-6">
            <div>
              <p className="intake-label">{t.conditionsIntro}</p>
              <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0 sm:grid-cols-2">
                {CONDITION_KEYS.map((k) => (
                  <Chip
                    key={k}
                    checked={form.conditions.includes(k)}
                    onClick={() => toggleCondition(k)}
                    label={conditionLabel(k, t)}
                  />
                ))}
                <div className="col-span-2 mt-2 border-t border-dashed border-[var(--ink-line)] pt-2">
                  <Chip
                    checked={form.noneOfAbove}
                    onClick={() => setNoneOfAbove(!form.noneOfAbove)}
                    label={t.condNone}
                  />
                </div>
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
              error={isErr("smoker")}
              errLabel={t.errRequired}
            >
              <SegmentGroup
                name="smoker"
                error={isErr("smoker")}
                value={form.smoker}
                onChange={(v) => update("smoker", v as Smoker)}
                options={[
                  { value: "yes", label: t.smokerYes },
                  { value: "no", label: t.smokerNo },
                  { value: "former", label: t.smokerFormer },
                ]}
              />
            </Field>

            <Field
              label={t.pregnantLabel}
              required
              error={isErr("pregnant")}
              errLabel={t.errRequired}
            >
              <SegmentGroup
                name="pregnant"
                error={isErr("pregnant")}
                value={form.pregnant}
                onChange={(v) => update("pregnant", v as Pregnant)}
                options={[
                  { value: "yes", label: t.pregnantYes },
                  { value: "no", label: t.pregnantNo },
                  { value: "na", label: t.pregnantNA },
                ]}
              />
            </Field>
          </div>
        </section>

        {/* Section 3 — Signature / consent */}
        <section className="intake-card">
          <SectionHeading num={t.s3Num} title={t.s3Title} sub={t.s3Sub} />

          <label className="mt-6 flex items-start gap-3 cursor-pointer">
            <span
              aria-hidden
              className="intake-chip-box mt-1"
              data-checked={form.consent}
              style={{
                background: form.consent ? "var(--ink)" : "transparent",
                borderColor: form.consent
                  ? "var(--ink)"
                  : errors.consent
                    ? "var(--chart-red)"
                    : "var(--ink-line-strong)",
              }}
            >
              {form.consent && (
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="var(--paper)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M2 6.5L5 9.5L10 3.5" />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              data-field="consent"
              checked={form.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="sr-only"
            />
            <span className="intake-serif text-[1rem] leading-relaxed text-[var(--ink)]">
              {t.consent}
            </span>
          </label>
          {errors.consent && <p className="intake-err ms-8">{t.errRequired}</p>}
        </section>

        <button type="submit" disabled={submitting} className="intake-btn w-full">
          {submitting ? t.submitting : t.submit}
          <span aria-hidden className="rtl-flip text-[var(--paper)]/80">
            →
          </span>
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
      <span className="intake-section-num shrink-0">{num}</span>
      <div className="min-w-0">
        <h2 className="intake-serif text-[1.35rem] leading-tight tracking-[-0.005em] text-[var(--ink)] sm:text-[1.55rem]">
          {title}
        </h2>
        {sub && (
          <p className="mt-1 text-[0.82rem] text-[var(--ink-faint)] sm:text-sm">
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
        {required && <span className="intake-required">*</span>}
      </span>
      {children}
      {error && errLabel && <span className="intake-err block">{errLabel}</span>}
    </label>
  );
}

function SegmentGroup<T extends string>({
  name,
  value,
  onChange,
  options,
  error,
}: {
  name: string;
  value: T | "";
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  error?: boolean;
}) {
  return (
    <div
      data-field={name}
      role="radiogroup"
      className={`intake-segment-group${error ? " is-error" : ""}`}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className="intake-segment"
        >
          {o.label}
        </button>
      ))}
    </div>
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
      <span aria-hidden className="intake-chip-box">
        {checked && (
          <svg
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            stroke="var(--paper)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 6.5L5 9.5L10 3.5" />
          </svg>
        )}
      </span>
      <span className="leading-tight">{label}</span>
    </button>
  );
}
