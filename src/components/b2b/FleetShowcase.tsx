import { models } from "@/lib/data/models";
import CarCard from "@/components/cars/CarCard";

const CATEGORIES = [
  {
    key: "last-mile",
    title: "Last-Mile Delivery",
    description: "รถกระบะ/ปิกอัพเพื่อการขนส่งระยะสั้นในเมือง",
    match: (bodyType: string) => bodyType === "Pickup",
  },
  {
    key: "shuttle",
    title: "Staff Shuttle",
    description: "รถตู้/MPV สำหรับรับส่งพนักงานและผู้โดยสารกลุ่ม",
    match: (bodyType: string) => bodyType === "Van" || bodyType === "MPV",
  },
  {
    key: "commercial-ev",
    title: "Commercial EV",
    description: "รถยนต์ไฟฟ้า 100% ลดต้นทุนพลังงานระยะยาว",
    match: (_bodyType: string, fuelType: string) => fuelType === "EV",
  },
];

export default function FleetShowcase() {
  return (
    <div className="space-y-14">
      {CATEGORIES.map((cat) => {
        const catModels = models.filter((m) => cat.match(m.bodyType, m.fuelType));
        if (catModels.length === 0) return null;
        return (
          <div key={cat.key}>
            <div className="flex items-baseline justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-brand-navy">{cat.title}</h3>
                <p className="text-sm text-brand-slate mt-1">{cat.description}</p>
              </div>
              <span className="text-xs font-semibold text-brand-slate shrink-0">{catModels.length} รุ่น</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {catModels.map((m) => (
                <CarCard key={m.slug} model={m} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
