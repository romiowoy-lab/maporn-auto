import Link from "next/link";
import { ReactNode } from "react";

const baseInput =
  "w-full rounded-lg border border-brand-line px-4 py-2.5 text-sm text-brand-navy placeholder:text-brand-slate/50 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors bg-white";

export function TextField({
  label,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-brand-navy mb-1.5">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <input required={required} className={baseInput} {...props} />
    </label>
  );
}

export function SelectField({
  label,
  required,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-brand-navy mb-1.5">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <select required={required} className={baseInput} {...props}>
        {children}
      </select>
    </label>
  );
}

export function TextAreaField({
  label,
  required,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-brand-navy mb-1.5">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <textarea required={required} rows={4} className={baseInput} {...props} />
    </label>
  );
}

export function ConsentCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 text-xs text-brand-slate leading-relaxed">
      <input
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-brand-line accent-brand-red shrink-0"
      />
      <span>
        ข้าพเจ้ายอมรับ{" "}
        <Link href="/privacy-policy" target="_blank" className="underline text-brand-navy font-medium">
          นโยบายความเป็นส่วนตัว
        </Link>{" "}
        และให้ความยินยอมในการเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลตาม{" "}
        <Link href="/pdpa" target="_blank" className="underline text-brand-navy font-medium">
          PDPA
        </Link>{" "}
        เพื่อให้บริษัทติดต่อกลับ <span className="text-red-600">*</span>
      </span>
    </label>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{message}</div>
  );
}

export function SuccessPanel({ leadId, title, description }: { leadId: string; title: string; description: string }) {
  return (
    <div className="rounded-2xl bg-brand-navy text-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-7 w-7">
          <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70 text-sm mb-1">{description}</p>
      <p className="text-brand-red text-xs font-mono">เลขที่คำขอ: {leadId}</p>
    </div>
  );
}
