"use client";

import { useState } from "react";
import { brands, getBrand } from "@/lib/data/brands";
import { getModelsByBrand, getModel, models } from "@/lib/data/models";
import { branches, getBranch } from "@/lib/data/branches";
import { useLeadSubmit } from "@/lib/useLeadSubmit";
import { ConsentCheckbox, ErrorBanner, SelectField, SuccessPanel, TextAreaField, TextField } from "@/components/forms/FormField";
import MultiStepForm from "@/components/forms/MultiStepForm";

const STEPS = ["รถที่สนใจ", "รายละเอียดการซื้อ", "ข้อมูลติดต่อ", "ยืนยัน"];

export default function QuotationForm({ defaultModel = "" }: { defaultModel?: string }) {
  const { state, errorMessage, leadId, submit, reset } = useLeadSubmit();
  const [step, setStep] = useState(0);
  const initialBrand = defaultModel ? getModel(defaultModel)?.brandSlug ?? "" : "";
  const [brand, setBrand] = useState(initialBrand);
  const [model, setModel] = useState(defaultModel);
  const [variant, setVariant] = useState("");
  const [branch, setBranch] = useState("");
  const [budget, setBudget] = useState("");
  const [purchaseType, setPurchaseType] = useState("เงินสด");
  const [needsFinancing, setNeedsFinancing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [lineId, setLineId] = useState("");
  const [remark, setRemark] = useState("");
  const [consent, setConsent] = useState(false);

  const availableModels = brand ? getModelsByBrand(brand) : models;
  const selectedModel = availableModels.find((m) => m.slug === model);

  async function handleSubmit() {
    await submit({
      type: "quotation",
      name,
      phone,
      email,
      lineId,
      brand,
      model,
      variant,
      branch,
      budget,
      purchaseType,
      needsFinancing,
      remark,
      consentAccepted: consent,
    });
  }

  if (state === "success") {
    return (
      <SuccessPanel
        leadId={leadId}
        title="ส่งคำขอใบเสนอราคาสำเร็จ!"
        description="ทีมฝ่ายขายจะจัดทำใบเสนอราคาและติดต่อกลับภายใน 24 ชั่วโมง"
      />
    );
  }

  const canGoNext = [Boolean(brand) && Boolean(model), true, Boolean(name) && Boolean(phone), consent][step];

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
        submitLabel="ส่งคำขอใบเสนอราคา"
      >
        {step === 0 && (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <SelectField
                label="แบรนด์"
                required
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setModel("");
                  setVariant("");
                }}
              >
                <option value="">เลือกแบรนด์</option>
                {brands.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.name}
                  </option>
                ))}
              </SelectField>
              <SelectField label="รุ่นรถ" required value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="">เลือกรุ่นรถ</option>
                {availableModels.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.name}
                  </option>
                ))}
              </SelectField>
            </div>
            {selectedModel && (
              <SelectField label="รุ่นย่อย" value={variant} onChange={(e) => setVariant(e.target.value)}>
                <option value="">ยังไม่ระบุรุ่นย่อย</option>
                {selectedModel.variants.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name}
                  </option>
                ))}
              </SelectField>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <SelectField label="สาขาที่สะดวก" value={branch} onChange={(e) => setBranch(e.target.value)}>
              <option value="">เลือกสาขา</option>
              {branches.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </SelectField>
            <div className="grid sm:grid-cols-2 gap-5">
              <SelectField label="งบประมาณโดยประมาณ" value={budget} onChange={(e) => setBudget(e.target.value)}>
                <option value="">ไม่ระบุ</option>
                <option value="ต่ำกว่า 600,000 บาท">ต่ำกว่า 600,000 บาท</option>
                <option value="600,000 - 900,000 บาท">600,000 - 900,000 บาท</option>
                <option value="900,000 - 1,200,000 บาท">900,000 - 1,200,000 บาท</option>
                <option value="มากกว่า 1,200,000 บาท">มากกว่า 1,200,000 บาท</option>
              </SelectField>
              <SelectField label="รูปแบบการซื้อ" value={purchaseType} onChange={(e) => setPurchaseType(e.target.value)}>
                <option value="เงินสด">เงินสด</option>
                <option value="เช่าซื้อ / ผ่อนชำระ">เช่าซื้อ / ผ่อนชำระ</option>
                <option value="ลีสซิ่ง">ลีสซิ่ง</option>
                <option value="เทิร์นรถเก่า (Trade-in)">เทิร์นรถเก่า (Trade-in)</option>
              </SelectField>
            </div>
            <label className="flex items-center gap-2.5 text-sm text-brand-navy">
              <input
                type="checkbox"
                checked={needsFinancing}
                onChange={(e) => setNeedsFinancing(e.target.checked)}
                className="h-4 w-4 rounded border-brand-line accent-brand-red"
              />
              ต้องการให้ติดต่อเรื่องไฟแนนซ์ / สินเชื่อรถยนต์
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <TextField label="ชื่อ-นามสกุล" required placeholder="กรอกชื่อ-นามสกุล" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField label="เบอร์โทรศัพท์" required placeholder="08X-XXX-XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <TextField label="Email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Line ID" placeholder="Line ID ของคุณ" value={lineId} onChange={(e) => setLineId(e.target.value)} />
            </div>
            <TextAreaField
              label={purchaseType === "เทิร์นรถเก่า (Trade-in)" ? "รายละเอียดรถเก่าที่ต้องการเทิร์น" : "หมายเหตุเพิ่มเติม"}
              placeholder={
                purchaseType === "เทิร์นรถเก่า (Trade-in)"
                  ? "ระบุยี่ห้อ รุ่น ปีที่จดทะเบียน และระยะทางที่ใช้งานของรถเก่า"
                  : "ระบุความต้องการเพิ่มเติม (ถ้ามี)"
              }
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div className="rounded-xl bg-slate-50 p-5 text-sm space-y-2">
              <p className="flex justify-between">
                <span className="text-brand-slate">แบรนด์ / รุ่น</span>
                <span className="font-semibold text-brand-navy">
                  {getBrand(brand)?.name} {getModel(model)?.name}
                  {variant ? ` (${variant})` : ""}
                </span>
              </p>
              {branch && (
                <p className="flex justify-between">
                  <span className="text-brand-slate">สาขา</span>
                  <span className="font-semibold text-brand-navy">{getBranch(branch)?.name}</span>
                </p>
              )}
              <p className="flex justify-between">
                <span className="text-brand-slate">รูปแบบการซื้อ</span>
                <span className="font-semibold text-brand-navy">{purchaseType}</span>
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
