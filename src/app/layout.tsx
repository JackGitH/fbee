import type { Metadata } from "next";
import "./globals.css";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { BottomStatusBar } from "@/components/layout/BottomStatusBar";
import { MobileNav } from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "FBEE - Decentralized Finance DApp",
  description: "FBEE DeFi ecosystem on BSC - Mining, Trading, Referral & More",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-surface text-on-surface font-body antialiased">
        <TopAppBar />
        <main className="pt-16 pb-12 md:pb-10 min-h-screen">
          {children}
        </main>
        <BottomStatusBar />
        <MobileNav />
      </body>
    </html>
  );
}
