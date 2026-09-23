"use client";

import { useState } from "react";
import { brands, getBrand } from "@/lib/data/brands";
import { getModelsByBrand, getModel, models } from "@/lib/data/models";
import { branches, getBranch } from "@/lib/data/branches";
import { useLeadSubmit } from "@/lib/useLeadSubmit";
import { ConsentCheckbox, ErrorBanner, SelectField, SuccessPanel, TextAreaField, TextField } from "@/components/forms/FormField";
import MultiStepForm from "@/components/forms/MultiStepForm";

const STEPS = ["แบรนด์", "รุ่นรถ", "สาขา", "วันที่", "เวลา", "ข้อมูลติดต่อ", "ยืนยัน"];

export default function TestDriveForm({
  defaultBrand = "",
  defaultModel = "",
  defaultBranch = "",
  defaultRemark = "",
}: {
  defaultBrand?: string;
  defaultModel?: string;
  defaultBranch?: string;
  defaultRemark?: string;
}) {
  const { state, errorMessage, leadId, submit, reset } = useLeadSubmit();
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState(defaultBrand || (defaultModel ? models.find((m) => m.slug === defaultModel)?.brandSlug ?? "" : ""));
  const [model, setModel] = useState(defaultModel);
  const [branch, setBranch] = useState(defaultBranch);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactChannel, setContactChannel] = useState("โทรศัพท์");
  const [remark, setRemark] = useState(defaultRemark);
  const [consent, setConsent] = useState(false);

  const availableModels = brand ? getModelsByBrand(brand) : models;

  async function handleSubmit() {
    await submit({
      type: "test-drive",
      name,
      phone,
      email,
      brand,
      model,
      branch,
      preferredDate: date,
      preferredTime: time,
      contactChannel,
      remark,
      consentAccepted: consent,
    });
  }

  if (state === "success") {
    return (
      <SuccessPanel
        leadId={leadId}
        title="จองทดลองขับสำเร็จ!"
        description="ทีมงานของเราจะติดต่อกลับเพื่อยืนยันนัดหมายภายใน 24 ชั่วโมง"
      />
    );
  }

  const canGoNext = [
    Boolean(brand),
    Boolean(model),
    Boolean(branch),
    Boolean(date),
    Boolean(time),
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
        submitLabel="ยืนยันจองทดลองขับ"
      >
        {step === 0 && (
          <SelectField
            label="เลือกแบรนด์ที่สนใจ"
            required
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setModel("");
            }}
          >
            <option value="">เลือกแบรนด์</option>
            {brands.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </SelectField>
        )}

        {step === 1 && (
          <SelectField label="เลือกรุ่นรถ" required value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="">เลือกรุ่นรถ</option>
            {availableModels.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.name}
              </option>
            ))}
          </SelectField>
        )}

        {step === 2 && (
          <SelectField label="สาขาที่ต้องการทดลองขับ" required value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="">เลือกสาขา</option>
            {branches.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </SelectField>
        )}

        {step === 3 && (
          <TextField label="วันที่ต้องการทดลองขับ" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
        )}

        {step === 4 && (
          <TextField label="เวลาที่ต้องการทดลองขับ" type="time" required value={time} onChange={(e) => setTime(e.target.value)} />
        )}

        {step === 5 && (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <TextField label="ชื่อ-นามสกุล" required placeholder="กรอกชื่อ-นามสกุล" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField label="เบอร์โทรศัพท์" required placeholder="08X-XXX-XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <TextField label="Email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <SelectField label="ช่องทางการติดต่อ" value={contactChannel} onChange={(e) => setContactChannel(e.target.value)}>
                <option value="โทรศัพท์">โทรศัพท์</option>
                <option value="Line">Line</option>
                <option value="Email">Email</option>
              </SelectField>
            </div>
            <TextAreaField
              label="หมายเหตุเพิ่มเติม"
              placeholder="ระบุความต้องการเพิ่มเติม (ถ้ามี)"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
        )}

        {step === 6 && (
          <div className="space-y-5">
            <div className="rounded-xl bg-slate-50 p-5 text-sm space-y-2">
              <p className="flex justify-between">
                <span className="text-brand-slate">แบรนด์ / รุ่น</span>
                <span className="font-semibold text-brand-navy">
                  {getBrand(brand)?.name} {getModel(model)?.name}
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
                <span className="text-brand-slate">ผู้ติดต่อ</span>
                <span className="font-semibold text-brand-navy">
                  {name} · {phone}
                </span>
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
