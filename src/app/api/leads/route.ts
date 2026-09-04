import { NextRequest, NextResponse } from "next/server";
import { appendLead } from "@/lib/leads";
import { Lead, LeadType } from "@/lib/types";

const VALID_TYPES: LeadType[] = ["contact", "test-drive", "quotation", "service", "inquiry"];

// simple in-memory rate limit per server instance (best-effort for demo purposes)
const submissionLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, 500);
}

const PHONE_REGEX = /^[0-9+\-\s()]{9,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "ส่งข้อมูลบ่อยเกินไป กรุณาลองใหม่ภายหลัง" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "รูปแบบข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const type = sanitize(body.type) as LeadType;
  const name = sanitize(body.name);
  const phone = sanitize(body.phone);
  const consentAccepted = body.consentAccepted === true;

  if (!VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "ประเภทคำขอไม่ถูกต้อง" }, { status: 400 });
  }
  if (!name || name.length < 2) {
    return NextResponse.json({ error: "กรุณากรอกชื่อ-นามสกุล" }, { status: 400 });
  }
  if (!PHONE_REGEX.test(phone)) {
    return NextResponse.json({ error: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง" }, { status: 400 });
  }
  const email = sanitize(body.email);
  if (email && !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "กรุณากรอกอีเมลให้ถูกต้อง" }, { status: 400 });
  }
  if (!consentAccepted) {
    return NextResponse.json({ error: "กรุณายอมรับนโยบายความเป็นส่วนตัวก่อนส่งข้อมูล" }, { status: 400 });
  }

  const lead: Lead = {
    id: `LD${Date.now().toString(36).toUpperCase()}`,
    type,
    status: "New",
    name,
    phone,
    email: email || undefined,
    lineId: sanitize(body.lineId) || undefined,
    brand: sanitize(body.brand) || undefined,
    model: sanitize(body.model) || undefined,
    variant: sanitize(body.variant) || undefined,
    branch: sanitize(body.branch) || undefined,
    preferredDate: sanitize(body.preferredDate) || undefined,
    preferredTime: sanitize(body.preferredTime) || undefined,
    contactChannel: sanitize(body.contactChannel) || undefined,
    budget: sanitize(body.budget) || undefined,
    purchaseType: sanitize(body.purchaseType) || undefined,
    needsFinancing: body.needsFinancing === true,
    plateNumber: sanitize(body.plateNumber) || undefined,
    serviceType: sanitize(body.serviceType) || undefined,
    issueDetail: sanitize(body.issueDetail) || undefined,
    remark: sanitize(body.remark) || undefined,
    consentAccepted,
    createdAt: new Date().toISOString(),
  };

  try {
    appendLead(lead);
  } catch {
    return NextResponse.json({ error: "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}
