import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "בנק השחר - Bank Hashachar",
  description: "Sign in to manage balances, cards, and transfers in Bankapp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
