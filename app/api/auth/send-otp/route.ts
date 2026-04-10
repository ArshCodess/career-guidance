/**
 * Place this file at:
 *   app/api/auth/send-otp/route.ts
 *
 * Required .env variables:
 *   TWILIO_ACCOUNT_SID
 *   TWILIO_AUTH_TOKEN
 *   TWILIO_VERIFY_SERVICE_SID
 */

import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client     = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID!;

function isValidE164(phone: string): boolean {
  return /^\+[1-9]\d{7,14}$/.test(phone);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body  = await req.json();
    const phone = (body.phone ?? "").trim();

    if (!phone)              return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    if (!isValidE164(phone)) return NextResponse.json({ error: "Invalid phone format. Use E.164 e.g. +919876543210" }, { status: 400 });

    const verification = await client.verify.v2
      .services(serviceSid)
      .verifications.create({ to: phone, channel: "sms" });

    return NextResponse.json({ status: verification.status }, { status: 200 });
  } catch (err: unknown) {
    console.error("[send-otp]", err);
    const code = (err as { code?: number }).code;
    if (code === 20404) return NextResponse.json({ error: "Verify service not found. Check TWILIO_VERIFY_SERVICE_SID." }, { status: 500 });
    const message = err instanceof Error ? err.message : "Failed to send OTP.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export function GET()    { return NextResponse.json({ error: "Method not allowed." }, { status: 405 }); }
export function PUT()    { return NextResponse.json({ error: "Method not allowed." }, { status: 405 }); }
export function DELETE() { return NextResponse.json({ error: "Method not allowed." }, { status: 405 }); }