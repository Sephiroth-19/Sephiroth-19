"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, StatusBadge } from "@/components/ui";
import { layoutStudents } from "@/data/mock-data";

export default function LayoutReviewPage() {
  const [tone, setTone] = useState("標準");
  const [size, setSize] = useState(80);
  const [order, setOrder] = useState("出席番号順");
  const [autoAlign, setAutoAlign] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">6年1組 レイアウト確認（卒業アルバム）</h3>
          <StatusBadge tone="info">AI初期配置</StatusBadge>
        </div>
        <p className="text-sm text-slate-400">先生エリア + 生徒グリッドで、クラス別紙面の最終確認を行います。</p>

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/60 p-4">
          <p className="mb-2 text-xs text-slate-400">教員エリア</p>
          <div className="mb-4 flex gap-3">
            <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-slate-700">
              <Image src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80" alt="teacher" fill className="object-cover" unoptimized />
            </div>
            <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-slate-700">
              <Image src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=200&q=80" alt="teacher" fill className="object-cover" unoptimized />
            </div>
          </div>

          <p className="mb-2 text-xs text-slate-400">生徒エリア（{order}）</p>
          <div className="grid grid-cols-5 gap-3">
            {layoutStudents.map((student) => (
              <div key={student.id} className="rounded-lg border border-slate-800 bg-slate-900/60 p-2">
                <div className="relative mx-auto overflow-hidden rounded-md" style={{ width: size, height: size }}>
                  <Image src={student.thumb} alt={student.name} fill className="object-cover" unoptimized />
                </div>
                <p className="mt-1 truncate text-center text-[11px]">{student.name}</p>
                <p className="text-center text-[10px] text-slate-500">配置 {student.seat}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="h-fit space-y-4">
        <h3 className="text-lg font-semibold">レイアウト設定</h3>

        <label className="block text-sm">
          <span className="text-slate-300">サイズ調整: {size}px</span>
          <input type="range" min={68} max={96} value={size} onChange={(e) => setSize(Number(e.target.value))} className="mt-2 w-full" />
        </label>

        <label className="block text-sm">
          <span className="text-slate-300">配置順確認</span>
          <select value={order} onChange={(e) => setOrder(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 p-2">
            <option>出席番号順</option>
            <option>名簿順</option>
            <option>手動調整順</option>
          </select>
        </label>

        <label className="block text-sm">
          <span className="text-slate-300">背景トーン</span>
          <select value={tone} onChange={(e) => setTone(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 p-2">
            <option>標準</option>
            <option>やや明るめ</option>
            <option>落ち着いた青</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" checked={autoAlign} onChange={(e) => setAutoAlign(e.target.checked)} />
          自動整列を有効にする
        </label>

        <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-sm">
          <p>クラス: 6年1組</p>
          <p>担任: 高橋 真理</p>
          <p>背景トーン: {tone}</p>
          <p>自動整列: {autoAlign ? "ON" : "OFF"}</p>
        </div>

        <div className="grid gap-2">
          <button onClick={() => flash("レイアウト保存しました") } className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold">レイアウト保存</button>
          <button onClick={() => flash("再生成しました（デモ）") } className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm">再生成</button>
          <button onClick={() => flash("書き出し確認を開始しました") } className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 text-sm">書き出し確認</button>
        </div>
      </Card>

      {toast ? <div className="fixed bottom-4 right-4 rounded-lg border border-blue-400/40 bg-blue-500/15 px-4 py-2 text-sm text-blue-200">{toast}</div> : null}
    </div>
  );
}
