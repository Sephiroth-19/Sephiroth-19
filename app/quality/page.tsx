"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, StatusBadge } from "@/components/ui";
import { qualityIssues } from "@/data/mock-data";

export default function QualityPage() {
  const [actionMap, setActionMap] = useState<Record<string, string>>({});

  return (
    <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
      <Card>
        <h3 className="text-lg font-semibold">重複チェック・品質確認</h3>
        <p className="text-sm text-slate-400">比較写真を見比べて、保持 / 除外 / 要確認 を選択してください。</p>

        <div className="mt-4 space-y-3">
          {qualityIssues.map((issue) => (
            <div key={issue.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium">{issue.student}（{issue.className}）</p>
                <StatusBadge tone={issue.type === "重複候補" ? "warn" : "danger"}>{issue.type}</StatusBadge>
              </div>

              <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-center">
                <div className="rounded-lg border border-slate-700 p-2">
                  <p className="mb-1 text-[11px] text-slate-400">比較A</p>
                  <div className="relative h-28 overflow-hidden rounded-md">
                    <Image src={issue.leftThumb} alt="left" fill className="object-cover" unoptimized />
                  </div>
                </div>
                <div className="rounded-lg border border-slate-700 p-2">
                  <p className="mb-1 text-[11px] text-slate-400">比較B</p>
                  <div className="relative h-28 overflow-hidden rounded-md">
                    <Image src={issue.rightThumb} alt="right" fill className="object-cover" unoptimized />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    ["保持", "ok"],
                    ["除外", "danger"],
                    ["要確認", "warn"]
                  ].map(([label]) => (
                    <button
                      key={label}
                      onClick={() => setActionMap((prev) => ({ ...prev, [issue.id]: label }))}
                      className="rounded-md border border-slate-700 px-3 py-1 text-xs hover:border-blue-400"
                    >
                      {label}
                    </button>
                  ))}
                  <p className="text-xs text-slate-400">判定: {actionMap[issue.id] ?? "未選択"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="h-fit">
        <h3 className="text-lg font-semibold">確認対象サマリー</h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">重複候補: 14件</li>
          <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">ブレ: 9件</li>
          <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">目つむり: 7件</li>
          <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">NG候補: 5件</li>
        </ul>

        <div className="mt-4 rounded-lg border border-amber-400/40 bg-amber-500/10 p-3 text-xs text-amber-200">
          ※ 実際の品質判定ロジックは未接続です。クライアント確認用のモック表示です。
        </div>
      </Card>
    </div>
  );
}
