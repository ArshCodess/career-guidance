/**
 * Place this file at:
 *   app/api/auth/verify-otp/route.ts
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
    const code  = (body.code  ?? "").trim();

    if (!phone || !code)     return NextResponse.json({ error: "Both phone and code are required." }, { status: 400 });
    if (!isValidE164(phone)) return NextResponse.json({ error: "Invalid phone format." }, { status: 400 });
    if (!/^\d{6}$/.test(code)) return NextResponse.json({ error: "Code must be 6 digits." }, { status: 400 });

    const check = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: phone, code });

    if (check.status === "approved") {
      /**
       * ✅ OTP approved — issue your session / JWT here.
       * Examples:
       *   - JWT cookie:   response.cookies.set("session", signJWT({ phone }))
       *   - NextAuth:     call signIn() or create a custom session
       */
      return NextResponse.json({ status: "approved" }, { status: 200 });
    }

    return NextResponse.json({ error: "Incorrect OTP. Please try again." }, { status: 401 });
  } catch (err: unknown) {
    console.error("[verify-otp]", err);
    const code = (err as { code?: number }).code;
    if (code === 60202) return NextResponse.json({ error: "Too many attempts. Please request a new OTP." }, { status: 429 });
    if (code === 60203) return NextResponse.json({ error: "Max OTP requests reached. Try again later." }, { status: 429 });
    const message = err instanceof Error ? err.message : "Verification failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export function GET()    { return NextResponse.json({ error: "Method not allowed." }, { status: 405 }); }
export function PUT()    { return NextResponse.json({ error: "Method not allowed." }, { status: 405 }); }
export function DELETE() { return NextResponse.json({ error: "Method not allowed." }, { status: 405 }); }