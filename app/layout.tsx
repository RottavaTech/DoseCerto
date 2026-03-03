import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css"; // Global styles

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "DoseCerto",
  description: "Aplicativo de saúde para cálculo de dosagem de medicamentos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${lexend.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
