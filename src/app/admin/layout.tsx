import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Maporn Autogroup",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#101113] text-white font-sans">
      {children}
    </div>
  );
}
