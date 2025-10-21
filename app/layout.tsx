import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
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
      <body className={jetbrainsMono.variable} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
