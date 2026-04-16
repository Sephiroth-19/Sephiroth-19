"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/mock-data";
import { cx } from "@/lib/helpers";

export function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen md:grid md:grid-cols-[250px_1fr]">
      <aside className="border-r border-slate-800 bg-slate-950/70 p-4 backdrop-blur-sm">
        <div className="mb-6 panel p-4">
          <p className="text-xs uppercase tracking-wider text-slate-300">Keigado Demo</p>
          <h1 className="mt-1 text-xl font-bold">恵雅堂 学校写真管理</h1>
          <p className="mt-2 text-xs text-slate-400">クライアント確認用ワークフロー</p>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "block rounded-xl border px-3 py-2 transition",
                  active
                    ? "border-blue-400/60 bg-blue-500/15 text-blue-200"
                    : "border-slate-800 bg-slate-900/60 text-slate-200 hover:border-slate-700 hover:bg-slate-900"
                )}
              >
                <p className="text-sm font-semibold">{item.label}</p>
                {item.subtitle ? <p className="text-xs text-slate-400">{item.subtitle}</p> : null}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="p-5 md:p-7">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Client Review Demo</p>
            <h2 className="text-2xl font-semibold">学校写真管理システム UI プレビュー</h2>
          </div>
          <div className="panel px-4 py-2 text-sm text-slate-300">本デモは画面確認用です（API/DB未接続）</div>
        </header>
        {children}
      </main>
    </div>
  );
}
