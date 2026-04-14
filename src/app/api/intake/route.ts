import { NextRequest } from "next/server";

interface IntakeSubmission {
  id: string;
  locale: "en" | "ar";

  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  idNumber: string;
  occupation: string;

  phone: string;
  email: string;
  city: string;
  address: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;

  conditions: string[];
  noneOfAbove: boolean;
  otherConditions: string;

  medications: string;
  allergies: string;
  smoker: string;
  pregnant: string;

  lastVisit: string;
  reason: string;
  issues: string[];
  notes: string;

  consent: boolean;
  consentPrivacy: boolean;

  createdAt: string;
}

// In-memory store. Replace with a database for production.
const submissions: IntakeSubmission[] = [];

function s(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function arr(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v) => typeof v === "string") : [];
}

function bool(value: unknown): boolean {
  return value === true;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const firstName = s(body.firstName).trim();
  const lastName = s(body.lastName).trim();
  const dob = s(body.dob).trim();
  const gender = s(body.gender).trim();
  const phone = s(body.phone).trim();
  const city = s(body.city).trim();
  const emergencyName = s(body.emergencyName).trim();
  const emergencyPhone = s(body.emergencyPhone).trim();
  const smoker = s(body.smoker).trim();
  const pregnant = s(body.pregnant).trim();
  const lastVisit = s(body.lastVisit).trim();
  const reason = s(body.reason).trim();
  const consent = bool(body.consent);
  const consentPrivacy = bool(body.consentPrivacy);

  const missing = {
    firstName: !firstName,
    lastName: !lastName,
    dob: !dob,
    gender: !gender,
    phone: !phone,
    city: !city,
    emergencyName: !emergencyName,
    emergencyPhone: !emergencyPhone,
    smoker: !smoker,
    pregnant: !pregnant,
    lastVisit: !lastVisit,
    reason: !reason,
    consent: !consent,
    consentPrivacy: !consentPrivacy,
  };
  const missingKeys = Object.entries(missing)
    .filter(([, v]) => v)
    .map(([k]) => k);

  if (missingKeys.length > 0) {
    return Response.json(
      { error: "Missing required fields", fields: missingKeys },
      { status: 400 },
    );
  }

  const rawLocale = s(body.locale);
  const locale: "en" | "ar" = rawLocale === "ar" ? "ar" : "en";

  const submission: IntakeSubmission = {
    id: `PT-${Date.now().toString(36).toUpperCase()}`,
    locale,
    firstName,
    lastName,
    dob,
    gender,
    idNumber: s(body.idNumber).trim(),
    occupation: s(body.occupation).trim(),
    phone,
    email: s(body.email).trim(),
    city,
    address: s(body.address).trim(),
    emergencyName,
    emergencyPhone,
    emergencyRelation: s(body.emergencyRelation).trim(),
    conditions: arr(body.conditions),
    noneOfAbove: bool(body.noneOfAbove),
    otherConditions: s(body.otherConditions).trim(),
    medications: s(body.medications).trim(),
    allergies: s(body.allergies).trim(),
    smoker,
    pregnant,
    lastVisit,
    reason,
    issues: arr(body.issues),
    notes: s(body.notes).trim(),
    consent,
    consentPrivacy,
    createdAt: new Date().toISOString(),
  };

  submissions.push(submission);

  return Response.json(
    { id: submission.id, createdAt: submission.createdAt },
    { status: 201 },
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const found = submissions.find((s) => s.id === id);
    if (!found) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    // Only return non-sensitive fields for confirmation screen
    return Response.json({
      id: found.id,
      firstName: found.firstName,
      lastName: found.lastName,
      locale: found.locale,
      createdAt: found.createdAt,
    });
  }
  // For internal listing only — would be protected in production
  return Response.json({ count: submissions.length });
}
