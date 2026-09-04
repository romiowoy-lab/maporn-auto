"use client";

import { useMemo, useState } from "react";
import { formatTHB } from "@/lib/utils";

export default function LoanCalculator() {
  const [price, setPrice] = useState(700000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [months, setMonths] = useState(60);
  const [interestRate, setInterestRate] = useState(3.5);

  const result = useMemo(() => {
    const downPayment = (price * downPaymentPercent) / 100;
    const financedAmount = price - downPayment;
    const totalInterest = financedAmount * (interestRate / 100) * (months / 12);
    const totalPayable = financedAmount + totalInterest;
    const monthlyPayment = months > 0 ? totalPayable / months : 0;
    return { downPayment, financedAmount, totalInterest, totalPayable, monthlyPayment };
  }, [price, downPaymentPercent, months, interestRate]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="card-elevated p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="font-medium text-brand-navy">ราคารถ</label>
            <span className="font-bold text-brand-navy">{formatTHB(price)}</span>
          </div>
          <input
            type="range"
            min={300000}
            max={2000000}
            step={10000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-brand-red"
          />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="font-medium text-brand-navy">เงินดาวน์</label>
            <span className="font-bold text-brand-navy">{downPaymentPercent}% ({formatTHB(result.downPayment)})</span>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full accent-brand-red"
          />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="font-medium text-brand-navy">ระยะเวลาผ่อน</label>
            <span className="font-bold text-brand-navy">{months} เดือน</span>
          </div>
          <input
            type="range"
            min={12}
            max={84}
            step={12}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full accent-brand-red"
          />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="font-medium text-brand-navy">อัตราดอกเบี้ยต่อปี</label>
            <span className="font-bold text-brand-navy">{interestRate}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-brand-red"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-brand-navy text-white p-6 sm:p-8 flex flex-col justify-center">
        <p className="text-xs text-white/60 uppercase tracking-wide mb-1">ค่างวดโดยประมาณ</p>
        <p className="text-4xl sm:text-5xl font-black text-brand-red-soft">{formatTHB(Math.round(result.monthlyPayment))}</p>
        <p className="text-white/60 text-xs mb-6">ต่อเดือน</p>

        <div className="space-y-3 text-sm border-t border-white/10 pt-5">
          <div className="flex justify-between">
            <span className="text-white/60">เงินดาวน์</span>
            <span className="font-semibold">{formatTHB(Math.round(result.downPayment))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">ยอดจัดไฟแนนซ์</span>
            <span className="font-semibold">{formatTHB(Math.round(result.financedAmount))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">ดอกเบี้ยรวมโดยประมาณ</span>
            <span className="font-semibold">{formatTHB(Math.round(result.totalInterest))}</span>
          </div>
          <div className="flex justify-between text-brand-red-soft font-bold">
            <span>ยอดชำระรวมทั้งสิ้น</span>
            <span>{formatTHB(Math.round(result.totalPayable))}</span>
          </div>
        </div>

        <p className="text-[11px] text-white/50 mt-6 leading-relaxed">
          * ผลการคำนวณนี้เป็นเพียงการประมาณการเบื้องต้นเท่านั้น อัตราดอกเบี้ยและเงื่อนไขจริงขึ้นอยู่กับการพิจารณาของสถาบันการเงิน
          กรุณาติดต่อฝ่ายขายเพื่อขอรายละเอียดที่แน่นอน
        </p>
      </div>
    </div>
  );
}
