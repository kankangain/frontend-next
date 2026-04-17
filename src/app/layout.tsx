import type { Metadata } from "next";
import { Cinzel_Decorative, Oxanium } from "next/font/google";
import { GlobalShortcuts } from "@/components/global-shortcuts";
import "./globals.css";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "PRABUDDHA 2026 Portal",
  description: "Event management frontend powered by Next.js and shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oxanium.variable} ${cinzelDecorative.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground flex flex-col">
        <GlobalShortcuts />
        {children}
      </body>
    </html>
  );
}
