import Link from "next/link";
import MapornLogo from "@/components/ui/MapornLogo";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#F7F7F5] px-4 py-20">
      <div className="text-center">
        <MapornLogo variant="red" className="mx-auto h-14 w-auto sm:h-16" />
        <p className="mt-10 text-6xl font-black tracking-tight text-brand-navy sm:text-7xl">404</p>
        <h1 className="mt-3 text-xl font-bold text-brand-navy sm:text-2xl">ไม่พบหน้าที่คุณค้นหา</h1>
        <p className="mt-2 text-sm text-brand-slate">หน้านี้อาจถูกย้ายหรือไม่มีอยู่แล้ว</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-lg bg-brand-red-gradient px-6 py-3 text-sm font-bold text-white transition-all hover:brightness-110">
            กลับหน้าแรก
          </Link>
          <Link href="/brands" className="rounded-lg border border-black/15 px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-black/[0.04]">
            ดูแบรนด์ทั้งหมด
          </Link>
        </div>
      </div>
    </div>
  );
}
