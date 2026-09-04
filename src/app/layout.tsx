import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CookieConsent from "@/components/layout/CookieConsent";
import { company } from "@/lib/data/company";

const anuphan = Anuphan({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-anuphan",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mapornautogroup.com"),
  title: {
    default: `${company.name} | ตัวแทนจำหน่ายรถยนต์ 7 แบรนด์`,
    template: `%s | ${company.name}`,
  },
  description:
    "Maporn Autogroup ตัวแทนจำหน่ายรถยนต์อย่างเป็นทางการ 7 แบรนด์ Suzuki, Farizon, Wuling, Nex, GWM, JAECOO, OMODA และ Lepas พร้อมบริการทดลองขับ ขอใบเสนอราคา และศูนย์บริการครบวงจรทั่วประเทศ",
  keywords: ["ดีลเลอร์รถยนต์", "Maporn Autogroup", "Suzuki", "Farizon", "Wuling", "GWM", "รถยนต์ไฟฟ้า", "ทดลองขับ"],
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: company.name,
    title: `${company.name} | ตัวแทนจำหน่ายรถยนต์ 7 แบรนด์`,
    description: "ตัวแทนจำหน่ายรถยนต์อย่างเป็นทางการ 7 แบรนด์ พร้อมบริการครบวงจรทั่วประเทศ",
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | ตัวแทนจำหน่ายรถยนต์ 7 แบรนด์`,
    description: "ตัวแทนจำหน่ายรถยนต์อย่างเป็นทางการ 7 แบรนด์ พร้อมบริการครบวงจรทั่วประเทศ",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: company.name,
    legalName: company.legalName,
    url: "https://www.mapornautogroup.com",
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.hqAddress,
      addressCountry: "TH",
    },
  };

  return (
    <html lang="th" className={`h-full antialiased ${anuphan.variable}`}>
      <body className="min-h-full flex flex-col">
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
