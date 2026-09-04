"use client";

import { useState } from "react";
import { models, getModel } from "@/lib/data/models";
import { branches, serviceOfferings, getBranch } from "@/lib/data/branches";
import { useLeadSubmit } from "@/lib/useLeadSubmit";
import { ConsentCheckbox, ErrorBanner, SelectField, SuccessPanel, TextAreaField, TextField } from "@/components/forms/FormField";
import MultiStepForm from "@/components/forms/MultiStepForm";

const STEPS = ["รถของคุณ", "นัดหมาย", "ข้อมูลติดต่อ", "ยืนยัน"];

export default function ServiceAppointmentForm({ defaultBranch = "" }: { defaultBranch?: string }) {
  const { state, errorMessage, leadId, submit, reset } = useLeadSubmit();
  const [step, setStep] = useState(0);
  const [model, setModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [branch, setBranch] = useState(defaultBranch);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [issueDetail, setIssueDetail] = useState("");
  const [consent, setConsent] = useState(false);

  const serviceCenters = branches.filter((b) => b.isServiceCenter);

  async function handleSubmit() {
    await submit({
      type: "service",
      name,
      phone,
      model,
      plateNumber,
      branch,
      preferredDate: date,
      preferredTime: time,
      serviceType,
      issueDetail,
      consentAccepted: consent,
    });
  }

  if (state === "success") {
    return (
      <SuccessPanel
        leadId={leadId}
        title="นัดหมายเข้าศูนย์บริการสำเร็จ!"
        description="ทีมศูนย์บริการจะติดต่อกลับเพื่อยืนยันนัดหมายภายใน 24 ชั่วโมง"
      />
    );
  }

  const canGoNext = [
    Boolean(model) && Boolean(plateNumber),
    Boolean(branch) && Boolean(date) && Boolean(time) && Boolean(serviceType),
    Boolean(name) && Boolean(phone),
    consent,
  ][step];

  return (
    <div>
      <ErrorBanner message={errorMessage} />
      <MultiStepForm
        steps={STEPS}
        currentStep={step}
        onBack={() => setStep((s) => s - 1)}
        onNext={() => setStep((s) => s + 1)}
        onSubmit={handleSubmit}
        canGoNext={Boolean(canGoNext)}
        submitting={state === "submitting"}
        submitLabel="ยืนยันนัดหมาย"
      >
        {step === 0 && (
          <div className="grid sm:grid-cols-2 gap-5">
            <SelectField label="รุ่นรถ" required value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="">เลือกรุ่นรถ</option>
              {models.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.name}
                </option>
              ))}
            </SelectField>
            <TextField
              label="ทะเบียนรถ"
              required
              placeholder="เช่น กข 1234 กรุงเทพมหานคร"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <SelectField label="สาขาศูนย์บริการ" required value={branch} onChange={(e) => setBranch(e.target.value)}>
              <option value="">เลือกสาขา</option>
              {serviceCenters.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </SelectField>
            <div className="grid sm:grid-cols-2 gap-5">
              <TextField label="วันที่ต้องการเข้าศูนย์" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
              <TextField label="เวลาที่ต้องการ" type="time" required value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <SelectField label="ประเภทบริการ" required value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
              <option value="">เลือกประเภทบริการ</option>
              {serviceOfferings.map((s) => (
                <option key={s.title} value={s.title}>
                  {s.title}
                </option>
              ))}
            </SelectField>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <TextField label="ชื่อ-นามสกุล" required placeholder="กรอกชื่อ-นามสกุล" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField label="เบอร์โทรศัพท์" required placeholder="08X-XXX-XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <TextAreaField
              label="รายละเอียดปัญหา / อาการที่พบ"
              placeholder="อธิบายอาการหรือความต้องการเบื้องต้น"
              value={issueDetail}
              onChange={(e) => setIssueDetail(e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div className="rounded-xl bg-slate-50 p-5 text-sm space-y-2">
              <p className="flex justify-between">
                <span className="text-brand-slate">รุ่นรถ / ทะเบียน</span>
                <span className="font-semibold text-brand-navy">
                  {getModel(model)?.name} · {plateNumber}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-brand-slate">สาขา</span>
                <span className="font-semibold text-brand-navy">{getBranch(branch)?.name}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-brand-slate">วันที่ / เวลา</span>
                <span className="font-semibold text-brand-navy">
                  {date} · {time}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-brand-slate">ประเภทบริการ</span>
                <span className="font-semibold text-brand-navy">{serviceType}</span>
              </p>
            </div>
            <ConsentCheckbox checked={consent} onChange={setConsent} />
          </div>
        )}
      </MultiStepForm>
      {state === "error" && (
        <button type="button" onClick={reset} className="mt-3 text-xs text-brand-slate underline">
          ล้างข้อความแจ้งเตือน
        </button>
      )}
    </div>
  );
}
