"use client";

import { ReactNode } from "react";

export default function MultiStepForm({
  steps,
  currentStep,
  onBack,
  onNext,
  onSubmit,
  canGoNext,
  submitting,
  submitLabel = "ยืนยัน",
  children,
}: {
  steps: string[];
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  canGoNext: boolean;
  submitting?: boolean;
  submitLabel?: string;
  children: ReactNode;
}) {
  const isLast = currentStep === steps.length - 1;

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center">
          {steps.map((label, i) => (
            <div key={label} className="flex-1 flex items-center last:flex-none">
              <div
                className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                  i <= currentStep ? "bg-brand-red text-white" : "bg-slate-100 text-brand-slate"
                }`}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 transition-colors ${i < currentStep ? "bg-brand-red" : "bg-slate-100"}`} />
              )}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs font-semibold text-brand-navy text-center">
          ขั้นตอนที่ {currentStep + 1} จาก {steps.length} · {steps[currentStep]}
        </p>
      </div>

      <div className="min-h-[160px]">{children}</div>

      <div className="mt-8 flex gap-3">
        {currentStep > 0 && (
          <button type="button" onClick={onBack} className="btn-outline flex-1">
            ย้อนกลับ
          </button>
        )}
        {isLast ? (
          <button type="button" onClick={onSubmit} disabled={!canGoNext || submitting} className="btn-red flex-1 disabled:opacity-60">
            {submitting ? "กำลังส่งข้อมูล..." : submitLabel}
          </button>
        ) : (
          <button type="button" onClick={onNext} disabled={!canGoNext} className="btn-red flex-1 disabled:opacity-40">
            ถัดไป
          </button>
        )}
      </div>
    </div>
  );
}
