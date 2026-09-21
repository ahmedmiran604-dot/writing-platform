import type { Metadata } from "next";
import { Lora, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const notoBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});
export const metadata: Metadata = {
  title: "সাহিত্য — লিখুন, প্রকাশ করুন",
  description: "বাংলাদেশের লেখকদের জন্য লেখালেখি ও প্রকাশনার প্ল্যাটফর্ম",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${lora.variable} ${notoBengali.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream font-bengali text-ink antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
