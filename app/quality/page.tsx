"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, StatusBadge } from "@/components/ui";
import { qualityIssues } from "@/data/mock-data";

export default function QualityPage() {
  const [actionMap, setActionMap] = useState<Record<string, string>>({});

  return (
    <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
      <Card>
        <h3 className="text-lg font-semibold">重複・品質チェック</h3>
        <p className="text-sm text-slate-400">AIが検出した問題候補を確認し、保持/除外を選択します。</p>

        <div className="mt-4 space-y-3">
          {qualityIssues.map((issue) => (
            <div key={issue.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium">{issue.student} / {issue.className}</p>
                <StatusBadge tone={issue.type === "重複候補" ? "warn" : "danger"}>{issue.type}</StatusBadge>
              </div>
              <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-center">
                <div className="relative h-28 overflow-hidden rounded-md border border-slate-700"><Image src={issue.leftThumb} alt="left" fill className="object-cover" unoptimized /></div>
                <div className="relative h-28 overflow-hidden rounded-md border border-slate-700"><Image src={issue.rightThumb} alt="right" fill className="object-cover" unoptimized /></div>
                <div className="flex flex-col gap-2">
                  {[
                    ["保持", "ok"],
                    ["除外", "danger"],
                    ["要確認", "warn"]
                  ].map(([label, tone]) => (
                    <button
                      key={label}
                      onClick={() => setActionMap((prev) => ({ ...prev, [issue.id]: label }))}
                      className="rounded-md border border-slate-700 px-3 py-1 text-xs hover:border-blue-400"
                    >
                      {label}
                    </button>
                  ))}
                  <p className="text-xs text-slate-400">選択: {actionMap[issue.id] ?? "未選択"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="h-fit">
        <h3 className="text-lg font-semibold">レビュー集計</h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">重複候補: 14</li>
          <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">ピンボケ: 9</li>
          <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">顔が小さい: 5</li>
          <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">露出不安定: 7</li>
        </ul>
        <div className="mt-4 rounded-lg border border-amber-400/40 bg-amber-500/10 p-3 text-xs text-amber-200">
          この数値はデモ用モックデータです。実際の検出ロジックは未実装です。
        </div>
      </Card>
    </div>
  );
}
