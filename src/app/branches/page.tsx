import type { Metadata } from "next";
import Image from "next/image";
import BranchExplorerClient from "./BranchExplorerClient";

export const metadata: Metadata = {
  title: "โชว์รูมและศูนย์บริการ กรุงเทพ ปทุมธานี ระยอง ศรีราชา | Maporn Autogroup",
  description:
    "ค้นหาโชว์รูมและศูนย์บริการ Maporn Autogroup พร้อมที่อยู่ แผนที่ Google Maps และ Line Contact ฝ่ายขายในแต่ละสาขา",
};

// ข้อมูลสาขาพร้อม LINE และ Google Maps ลิงก์ทั้งหมด
export interface Branch {
  slug: string;
  name: string;
  province: string;
  address: string;
  phone: string;
  hours: string;
  lineUrl: string;
  mapUrl: string;
}

const branchesData: Branch[] = [
  {
    slug: "suzuki-srinakarin",
    name: "Suzuki Maporn Srinakarin",
    province: "กรุงเทพมหานคร",
    address: "ถนนศรีนครินทร์ แขวงหนองบอน เขตประเวศ กรุงเทพมหานคร",
    phone: "02-xxx-xxxx",
    hours: "08:00 - 17:00 น.",
    lineUrl: "https://lin.ee/qx4qvzu",
    mapUrl: "https://maps.app.goo.gl/k8EnQbJkQCV7Y4Ke7",
  },
  {
    slug: "suzuki-rayong",
    name: "Suzuki Maporn Rayong",
    province: "ระยอง",
    address: "อำเภอเมืองระยอง จังหวัดระยอง",
    phone: "038-xxx-xxxx",
    hours: "08:00 - 17:00 น.",
    lineUrl: "https://lin.ee/VJenMNt",
    mapUrl: "https://maps.app.goo.gl/PpVTxiu8pdgwiDjE6",
  },
  {
    slug: "suzuki-sriracha",
    name: "Suzuki Maporn Sriracha",
    province: "ชลบุรี",
    address: "อำเภอศรีราชา จังหวัดชลบุรี",
    phone: "038-xxx-xxxx",
    hours: "08:00 - 17:00 น.",
    lineUrl: "https://lin.ee/plVLw5T",
    mapUrl: "https://maps.app.goo.gl/TUsrYP6UbTkmbSgH6",
  },
  {
    slug: "suzy-fix",
    name: "Suzy Fix",
    province: "ระยอง",
    address: "อำเภอเมืองระยอง จังหวัดระยอง",
    phone: "038-xxx-xxxx",
    hours: "08:00 - 17:00 น.",
    lineUrl: "https://lin.ee/oHjNQT3",
    mapUrl: "https://maps.app.goo.gl/z5bcnF2euQidaogo6",
  },
  {
    slug: "omoda-jaecoo-rayong",
    name: "Omoda & Jaecoo Maporn Rayong",
    province: "ระยอง",
    address: "อำเภอเมืองระยอง จังหวัดระยอง",
    phone: "038-xxx-xxxx",
    hours: "08:00 - 17:00 น.",
    lineUrl: "https://lin.ee/OxkH8TH",
    mapUrl: "https://maps.app.goo.gl/jaSd7YHB1C98enT57",
  },
  {
    slug: "wuling-rayong",
    name: "Wuling Maporn Rayong",
    province: "ระยอง",
    address: "อำเภอเมืองระยอง จังหวัดระยอง",
    phone: "038-xxx-xxxx",
    hours: "08:00 - 17:00 น.",
    lineUrl: "https://lin.ee/OAIckwMt",
    mapUrl: "https://maps.app.goo.gl/himpFdJXsgsQLWhV8",
  },
  {
    slug: "lepas-rayong",
    name: "Lepas Maporn Rayong",
    province: "ระยอง",
    address: "อำเภอเมืองระยอง จังหวัดระยอง",
    phone: "038-xxx-xxxx",
    hours: "08:00 - 17:00 น.",
    lineUrl: "https://lin.ee/WycgPBv",
    mapUrl: "https://maps.app.goo.gl/JVAsEfaq1yxcSMzh9",
  },
  {
    slug: "gwm-lamlukka",
    name: "GWM Maporn Lamlukka",
    province: "ปทุมธานี",
    address: "อำเภอลำลูกกา จังหวัดปทุมธานี",
    phone: "02-xxx-xxxx",
    hours: "08:00 - 17:00 น.",
    lineUrl: "https://lin.ee/pHyv4TK",
    mapUrl: "https://maps.app.goo.gl/pHyv4TK",
  },
];

export default function BranchesPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <Image
          src="/brand/branches-network-map.jpg"
          alt="แผนที่เครือข่ายโชว์รูมและศูนย์บริการ Maporn Autogroup"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 mix-blend-overlay"
          style={{ objectPosition: "70% 8%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-transparent z-0" />

        <div className="container-page relative z-10 flex min-h-[420px] items-center py-12 sm:min-h-[480px] sm:py-16">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-white/10 text-white backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-white/20">
              Showroom Network
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              เครือข่ายโชว์รูมและศูนย์บริการ <br />
              <span className="text-brand-red">มาพรพาณิชย์</span>
            </h1>
            <p className="mt-4 max-w-xl text-white/90 text-sm sm:text-base leading-relaxed">
              พร้อมดูแลคุณด้วยบริการมาตรฐานระดับมืออาชีพ ทั้งหมด {branchesData.length} สาขาทั่วประเทศ
              ครอบคลุมกรุงเทพฯ ปริมณฑล ชลบุรี และระยอง
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container-page py-10 sm:py-14">
        <BranchExplorerClient branches={branchesData} />
      </div>
    </div>
  );
}