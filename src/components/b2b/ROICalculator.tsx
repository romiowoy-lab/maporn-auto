"use client";

import { useMemo, useState } from "react";
import { formatTHB } from "@/lib/utils";

export default function ROICalculator() {
  const [fleetSize, setFleetSize] = useState(5);
  const [monthlyKm, setMonthlyKm] = useState(3000);
  const [fuelPrice, setFuelPrice] = useState(33);
  const [fuelEfficiency, setFuelEfficiency] = useState(10);
  const [elecPrice, setElecPrice] = useState(4.5);
  const [evConsumption, setEvConsumption] = useState(18);

  const result = useMemo(() => {
    const iceCostPerVehicle = (monthlyKm / fuelEfficiency) * fuelPrice;
    const evCostPerVehicle = (monthlyKm / 100) * evConsumption * elecPrice;
    const savingsPerVehicle = iceCostPerVehicle - evCostPerVehicle;
    const fleetMonthlySavings = savingsPerVehicle * fleetSize;
    const fleetAnnualSavings = fleetMonthlySavings * 12;
    return {
      iceCostPerVehicle,
      evCostPerVehicle,
      savingsPerVehicle,
      fleetMonthlySavings,
      fleetAnnualSavings,
    };
  }, [fleetSize, monthlyKm, fuelPrice, fuelEfficiency, elecPrice, evConsumption]);

  const sliderClass = "w-full accent-brand-red";

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="card-elevated p-6 sm:p-8 space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="font-medium text-brand-navy">จำนวนรถในฟลีท</label>
            <span className="font-bold text-brand-navy">{fleetSize} คัน</span>
          </div>
          <input type="range" min={1} max={50} step={1} value={fleetSize} onChange={(e) => setFleetSize(Number(e.target.value))} className={sliderClass} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="font-medium text-brand-navy">ระยะทางวิ่งต่อคันต่อเดือน</label>
            <span className="font-bold text-brand-navy">{monthlyKm.toLocaleString("th-TH")} กม.</span>
          </div>
          <input type="range" min={500} max={10000} step={250} value={monthlyKm} onChange={(e) => setMonthlyKm(Number(e.target.value))} className={sliderClass} />
        </div>
        <div className="hairline" />
        <p className="text-[11px] font-semibold text-brand-slate uppercase tracking-widest">รถน้ำมัน/ดีเซล (ปัจจุบัน)</p>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="font-medium text-brand-navy">ราคาน้ำมัน (บาท/ลิตร)</label>
            <span className="font-bold text-brand-navy">{fuelPrice} บาท</span>
          </div>
          <input type="range" min={20} max={45} step={0.5} value={fuelPrice} onChange={(e) => setFuelPrice(Number(e.target.value))} className={sliderClass} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="font-medium text-brand-navy">อัตราสิ้นเปลืองน้ำมัน (กม./ลิตร)</label>
            <span className="font-bold text-brand-navy">{fuelEfficiency} กม./ล.</span>
          </div>
          <input type="range" min={4} max={20} step={0.5} value={fuelEfficiency} onChange={(e) => setFuelEfficiency(Number(e.target.value))} className={sliderClass} />
        </div>
        <div className="hairline" />
        <p className="text-[11px] font-semibold text-brand-slate uppercase tracking-widest">รถยนต์ไฟฟ้า (EV)</p>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="font-medium text-brand-navy">ราคาไฟฟ้า (บาท/kWh)</label>
            <span className="font-bold text-brand-navy">{elecPrice} บาท</span>
          </div>
          <input type="range" min={2.5} max={8} step={0.1} value={elecPrice} onChange={(e) => setElecPrice(Number(e.target.value))} className={sliderClass} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="font-medium text-brand-navy">อัตราใช้ไฟฟ้า (kWh/100กม.)</label>
            <span className="font-bold text-brand-navy">{evConsumption} kWh</span>
          </div>
          <input type="range" min={10} max={30} step={1} value={evConsumption} onChange={(e) => setEvConsumption(Number(e.target.value))} className={sliderClass} />
        </div>
      </div>

      <div className="rounded-2xl bg-brand-navy text-white p-6 sm:p-8 flex flex-col justify-center">
        <p className="text-xs text-white/60 uppercase tracking-wide mb-1">ประหยัดค่าพลังงานทั้งฟลีทต่อปี (ประมาณการ)</p>
        <p className={`text-4xl sm:text-5xl font-black ${result.fleetAnnualSavings >= 0 ? "text-brand-red-soft" : "text-white"}`}>
          {formatTHB(Math.round(result.fleetAnnualSavings))}
        </p>
        <p className="text-white/60 text-xs mb-6">เมื่อเปลี่ยนจากรถน้ำมัน/ดีเซลเป็นรถยนต์ไฟฟ้าทั้งฟลีท</p>

        <div className="space-y-3 text-sm border-t border-white/10 pt-5">
          <div className="flex justify-between">
            <span className="text-white/60">ค่าน้ำมันต่อคัน/เดือน</span>
            <span className="font-semibold">{formatTHB(Math.round(result.iceCostPerVehicle))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">ค่าไฟฟ้าต่อคัน/เดือน</span>
            <span className="font-semibold">{formatTHB(Math.round(result.evCostPerVehicle))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">ประหยัดต่อคัน/เดือน</span>
            <span className="font-semibold">{formatTHB(Math.round(result.savingsPerVehicle))}</span>
          </div>
          <div className="flex justify-between text-brand-red-soft font-bold">
            <span>ประหยัดทั้งฟลีท/เดือน</span>
            <span>{formatTHB(Math.round(result.fleetMonthlySavings))}</span>
          </div>
        </div>

        <p className="text-[11px] text-white/50 mt-6 leading-relaxed">
          * ค่าเริ่มต้นในเครื่องคำนวณเป็นสมมติฐานโดยประมาณ ปรับได้ตามข้อมูลจริงของธุรกิจคุณ — ไม่รวมค่าบำรุงรักษา ค่าใช้จ่ายในการติดตั้งเครื่องชาร์จ
          และปัจจัยอื่นที่อาจกระทบต้นทุนจริง กรุณาติดต่อทีม B2B เพื่อขอประเมินแบบละเอียดตามรุ่นรถและรูปแบบการใช้งานจริง
        </p>
      </div>
    </div>
  );
}
