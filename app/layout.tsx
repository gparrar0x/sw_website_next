import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Skywalking.dev - Automatización Empresarial con IA",
  description: "Agencia especializada en automatización empresarial con IA. Agentes conversacionales, automatización de procesos y transformación digital para empresas LATAM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={dmSans.variable} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
