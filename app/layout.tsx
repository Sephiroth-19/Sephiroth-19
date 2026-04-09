import type { Metadata } from "next";
import "./globals.css";
import { MainShell } from "@/components/main-shell";

export const metadata: Metadata = {
  title: "恵雅堂 学校写真管理システム UIデモ",
  description: "Keigado client review frontend demo"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <MainShell>{children}</MainShell>
      </body>
    </html>
  );
}
