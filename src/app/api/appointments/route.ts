import { NextRequest } from "next/server";

interface Appointment {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  notes: string;
  createdAt: string;
}

const appointments: Appointment[] = [];

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { firstName, lastName, email, phone, service, doctor, date, time, notes } = body;

  if (!firstName || !lastName || !email || !phone || !service || !doctor || !date || !time) {
    return Response.json(
      { error: "All required fields must be filled out." },
      { status: 400 }
    );
  }

  const appointment: Appointment = {
    id: `APT-${Date.now().toString(36).toUpperCase()}`,
    firstName,
    lastName,
    email,
    phone,
    service,
    doctor,
    date,
    time,
    notes: notes || "",
    createdAt: new Date().toISOString(),
  };

  appointments.push(appointment);

  return Response.json(appointment, { status: 201 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const appointment = appointments.find((a) => a.id === id);
    if (!appointment) {
      return Response.json({ error: "Appointment not found" }, { status: 404 });
    }
    return Response.json(appointment);
  }

  return Response.json(appointments);
}
