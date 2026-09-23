import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CookieConsent from "@/components/layout/CookieConsent";
import { company } from "@/lib/data/company";
import { branches } from "@/lib/data/branches";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});

// Only phones verified against a real source go into structured data (others are placeholders).
const VERIFIED_PHONE = new Set(["srinakarin", "rayong"]);

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mapornautogroup.com"),
  title: {
    default: `${company.name} | ตัวแทนจำหน่ายรถยนต์ Multi-Brand 7 แบรนด์`,
    template: `%s | ${company.name}`,
  },
  description:
    "มาพรพาณิชย์ ตัวแทนจำหน่ายรถยนต์ multi-brand อย่างเป็นทางการ 7 แบรนด์ Suzuki, Farizon, Wuling, Nex, GWM, JAECOO, OMODA และ Lepas โชว์รูมและศูนย์บริการรถ EV กรุงเทพ ระยอง ศรีราชา พร้อมโซลูชันรถบรรทุกไฟฟ้า B2B",
  keywords: [
    "มาพรพาณิชย์",
    "Maporn Autogroup",
    "ตัวแทนจำหน่ายรถยนต์ multi-brand",
    "โชว์รูม GWM ระยอง ศรีราชา",
    "ศูนย์บริการรถ EV กรุงเทพ",
    "รถบรรทุกไฟฟ้า B2B",
    "Suzuki",
    "Farizon",
    "Wuling",
    "JAECOO OMODA",
    "รถยนต์ไฟฟ้า",
    "ทดลองขับ",
  ],
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: company.name,
    title: `${company.name} | ตัวแทนจำหน่ายรถยนต์ Multi-Brand 7 แบรนด์`,
    description: "ตัวแทนจำหน่ายรถยนต์อย่างเป็นทางการ 7 แบรนด์ พร้อมบริการครบวงจรทั่วประเทศ",
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | ตัวแทนจำหน่ายรถยนต์ Multi-Brand 7 แบรนด์`,
    description: "ตัวแทนจำหน่ายรถยนต์อย่างเป็นทางการ 7 แบรนด์ พร้อมบริการครบวงจรทั่วประเทศ",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: company.name,
    legalName: company.legalName,
    url: "https://www.mapornautogroup.com",
    telephone: company.phone,
    email: company.email,
    taxID: company.taxId,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.hqAddress,
      addressCountry: "TH",
    },
    department: branches.map((b) => ({
      "@type": "AutomotiveBusiness",
      name: b.name,
      ...(VERIFIED_PHONE.has(b.slug) ? { telephone: b.phone } : {}),
      address: {
        "@type": "PostalAddress",
        streetAddress: b.address,
        addressRegion: b.province,
        addressCountry: "TH",
      },
    })),
  };

  return (
    <html lang="th" className={`h-full antialiased ${prompt.variable}`}>
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
        <CookieConsent />
      </body>
    </html>
  );
}