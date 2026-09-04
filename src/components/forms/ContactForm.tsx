"use client";

import { FormEvent, useState } from "react";
import { brands } from "@/lib/data/brands";
import { useLeadSubmit } from "@/lib/useLeadSubmit";
import { ConsentCheckbox, ErrorBanner, SelectField, SuccessPanel, TextAreaField, TextField } from "@/components/forms/FormField";

export default function ContactForm({ defaultBrand = "" }: { defaultBrand?: string }) {
  const { state, errorMessage, leadId, submit, reset } = useLeadSubmit();
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await submit({
      type: "contact",
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      brand: form.get("brand"),
      remark: form.get("message"),
      consentAccepted: consent,
    });
  }

  if (state === "success") {
    return (
      <SuccessPanel leadId={leadId} title="ส่งข้อความสำเร็จ!" description="ทีมงานของเราจะติดต่อกลับโดยเร็วที่สุด" />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ErrorBanner message={errorMessage} />
      <div className="grid sm:grid-cols-2 gap-5">
        <TextField label="ชื่อ-นามสกุล" name="name" required placeholder="กรอกชื่อ-นามสกุล" />
        <TextField label="เบอร์โทรศัพท์" name="phone" required placeholder="08X-XXX-XXXX" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <TextField label="Email" type="email" name="email" placeholder="you@email.com" />
        <SelectField label="สนใจแบรนด์ (ถ้ามี)" name="brand" defaultValue={defaultBrand}>
          <option value="">ไม่ระบุ</option>
          {brands.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
            </option>
          ))}
        </SelectField>
      </div>
      <TextAreaField label="ข้อความ" name="message" required placeholder="สอบถามเกี่ยวกับ..." rows={5} />
      <ConsentCheckbox checked={consent} onChange={setConsent} />
      <button type="submit" disabled={state === "submitting"} className="btn-red w-full disabled:opacity-60">
        {state === "submitting" ? "กำลังส่งข้อมูล..." : "ส่งข้อความ"}
      </button>
      {state === "error" && (
        <button type="button" onClick={reset} className="text-xs text-brand-slate underline">
          ล้างข้อความแจ้งเตือน
        </button>
      )}
    </form>
  );
}
