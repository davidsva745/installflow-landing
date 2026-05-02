import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InstallFlow | AI CRM pro instalační firmy",
  description:
    "AI-driven CRM and dispatcher for Solar PV and Heat Pump installation companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
