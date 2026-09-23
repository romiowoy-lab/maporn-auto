"use client";

import { useState } from "react";
import { useLeadSubmit } from "@/lib/useLeadSubmit";
import { ConsentCheckbox, ErrorBanner, SelectField, SuccessPanel, TextAreaField, TextField } from "@/components/forms/FormField";

const BUSINESS_TYPES = ["โลจิสติกส์ / ขนส่งพัสดุ", "รับส่งพนักงาน", "ให้เช่ารถ", "ราชการ / รัฐวิสาหกิจ", "อื่น ๆ"];
const FLEET_SIZES = ["1-5 คัน", "6-20 คัน", "21-50 คัน", "มากกว่า 50 คัน"];

export default function B2BInquiryForm() {
  const { state, errorMessage, leadId, submit, reset } = useLeadSubmit();
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState(BUSINESS_TYPES[0]);
  const [fleetSize, setFleetSize] = useState(FLEET_SIZES[0]);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit({
      type: "inquiry",
      name: `${contactName} (${companyName})`,
      phone,
      email,
      remark: `ประเภทธุรกิจ: ${businessType} | ขนาดฟลีท: ${fleetSize}${message ? ` | รายละเอียด: ${message}` : ""}`,
      consentAccepted: consent,
    });
  }

  if (state === "success") {
    return (
      <SuccessPanel
        leadId={leadId}
        title="ส่งคำขอสำเร็จ!"
        description="ทีม B2B Fleet ของเราจะติดต่อกลับเพื่อนำเสนอข้อเสนอสำหรับธุรกิจของคุณภายใน 1-2 วันทำการ"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ErrorBanner message={errorMessage} />
      <div className="grid sm:grid-cols-2 gap-5">
        <TextField label="ชื่อบริษัท" required placeholder="ชื่อบริษัท/ห้างร้าน" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        <TextField label="ชื่อผู้ติดต่อ" required placeholder="ชื่อ-นามสกุลผู้ติดต่อ" value={contactName} onChange={(e) => setContactName(e.target.value)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <TextField label="เบอร์โทรศัพท์" required placeholder="08X-XXX-XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <TextField label="Email" type="email" placeholder="company@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <SelectField label="ประเภทธุรกิจ" value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
          {BUSINESS_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </SelectField>
        <SelectField label="ขนาดฟลีทที่ต้องการ" value={fleetSize} onChange={(e) => setFleetSize(e.target.value)}>
          {FLEET_SIZES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </SelectField>
      </div>
      <TextAreaField
        label="รายละเอียดเพิ่มเติม"
        placeholder="ระบุความต้องการ เช่น รุ่นรถที่สนใจ งบประมาณ หรือกำหนดเวลาที่ต้องการใช้งาน"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <ConsentCheckbox checked={consent} onChange={setConsent} />
      <button type="submit" disabled={state === "submitting" || !consent} className="btn-red w-full sm:w-auto disabled:opacity-50">
        {state === "submitting" ? "กำลังส่งข้อมูล..." : "ขอข้อเสนอสำหรับธุรกิจ"}
      </button>
      {state === "error" && (
        <button type="button" onClick={reset} className="ml-3 text-xs text-brand-slate underline">
          ล้างข้อความแจ้งเตือน
        </button>
      )}
    </form>
  );
}
