"use client";

import { FormEvent, useState } from "react";
import { branches } from "@/lib/data/branches";
import { useLeadSubmit } from "@/lib/useLeadSubmit";
import { ConsentCheckbox, ErrorBanner, SelectField, SuccessPanel, TextAreaField, TextField } from "@/components/forms/FormField";

export default function DoorstepTestDriveForm() {
  const { state, errorMessage, leadId, submit, reset } = useLeadSubmit();
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const address = form.get("address");
    const message = form.get("message");
    await submit({
      type: "test-drive",
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      branch: form.get("branch"),
      preferredDate: form.get("date"),
      remark: `Doorstep Test Drive — ที่อยู่นัดหมาย: ${address}${message ? ` | หมายเหตุ: ${message}` : ""}`,
      consentAccepted: consent,
    });
  }

  if (state === "success") {
    return (
      <SuccessPanel
        leadId={leadId}
        title="ส่งคำขอสำเร็จ!"
        description="ทีมงานของเราจะติดต่อกลับเพื่อยืนยันวันเวลานำรถไปทดลองขับถึงที่"
      />
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
        <TextField label="วันที่สะดวก" type="date" name="date" required />
      </div>
      <SelectField label="สาขาที่ใกล้คุณที่สุด" name="branch" required defaultValue="">
        <option value="" disabled>
          เลือกสาขา
        </option>
        {branches.map((b) => (
          <option key={b.slug} value={b.slug}>
            {b.name}
          </option>
        ))}
      </SelectField>
      <TextAreaField
        label="ที่อยู่ที่ต้องการให้นำรถไปทดลองขับ"
        name="address"
        required
        placeholder="บ้านเลขที่ ถนน ตำบล/แขวง อำเภอ/เขต จังหวัด และรหัสไปรษณีย์"
        rows={3}
      />
      <TextAreaField label="หมายเหตุเพิ่มเติม" name="message" placeholder="ระบุรุ่นรถที่สนใจ หรือรายละเอียดอื่น ๆ (ถ้ามี)" rows={3} />
      <ConsentCheckbox checked={consent} onChange={setConsent} />
      <button type="submit" disabled={state === "submitting"} className="btn-red w-full sm:w-auto disabled:opacity-60">
        {state === "submitting" ? "กำลังส่งข้อมูล..." : "นัดหมาย Doorstep Test Drive"}
      </button>
      {state === "error" && (
        <button type="button" onClick={reset} className="ml-3 text-xs text-brand-slate underline">
          ล้างข้อความแจ้งเตือน
        </button>
      )}
    </form>
  );
}
