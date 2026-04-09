"use client";

import { useState } from "react";
import { Card, ProgressBar, StatusBadge } from "@/components/ui";
import { uploadFiles } from "@/data/mock-data";

const fields = [
  { label: "学校名", placeholder: "例）恵雅学園 小学校", value: "恵雅学園 小学校" },
  { label: "年度", placeholder: "例）2026", value: "2026" },
  { label: "クラス名", placeholder: "例）6年1組", value: "6年1組" },
  { label: "カメラマン名", placeholder: "例）佐藤 健", value: "佐藤 健" },
  { label: "写真フォルダ", placeholder: "例）/portraits/2026_6-1", value: "" },
  { label: "名簿ファイル", placeholder: "例）roster_6-1.xlsx", value: "" },
  { label: "教員データ", placeholder: "例）teacher_master.csv", value: "" },
  { label: "イベント名", placeholder: "例）卒業アルバム個人撮影", value: "卒業アルバム個人撮影" },
  { label: "備考", placeholder: "欠席者・再撮影予定など", value: "4/10 再撮影対象2名" }
];

export default function UploadPage() {
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("待機中");
  const [toast, setToast] = useState<string | null>(null);

  const startProcessing = () => {
    if (started) return;
    setStarted(true);
    setToast("処理を開始しました（デモ）");
    setStage("名簿照合中");

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 10;
        if (next >= 30 && next < 60) setStage("札番号照合中");
        if (next >= 60 && next < 90) setStage("顔照合中");
        if (next >= 90) setStage("レビュー準備完了");

        if (next >= 100) {
          clearInterval(timer);
          setToast("照合処理が完了しました（モック）");
          return 100;
        }
        return next;
      });
    }, 450);
  };

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold">新規案件作成（写真アップロード）</h3>
        <p className="text-sm text-slate-400">学校写真の処理を開始するため、撮影情報と取込ファイルを登録します。</p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <label key={field.label} className="text-sm">
              <span className="mb-1 block text-slate-300">{field.label}</span>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-blue-400"
                placeholder={field.placeholder}
                defaultValue={field.value}
              />
              <span className="mt-1 block text-xs text-slate-500">{field.label === "教員データ" ? "時間割・教員台帳連携向けのCSV/Excelを想定" : ""}</span>
            </label>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-dashed border-blue-400/40 bg-blue-500/5 p-6 text-center">
          <p className="text-sm font-medium">写真フォルダ / 名簿ファイル / 教員データをドラッグ＆ドロップ（デモ）</p>
          <p className="text-xs text-slate-400">実ファイル送信は行いません。クライアント確認用の疑似UIです。</p>
        </div>
      </Card>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <h3 className="text-lg font-semibold">取込ファイル一覧</h3>
          <ul className="mt-3 space-y-2">
            {uploadFiles.map((file) => (
              <li key={file.id} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-sm">
                <div>
                  <p className="font-medium">{file.fileName}</p>
                  <p className="text-xs text-slate-400">{file.type} / {file.size}</p>
                </div>
                <StatusBadge tone={file.status === "確認済み" ? "ok" : file.status === "エラー" ? "danger" : "warn"}>{file.status}</StatusBadge>
              </li>
            ))}
          </ul>
          <button onClick={startProcessing} className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400">
            処理開始
          </button>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold">処理進捗（デモ）</h3>
          <p className="mt-1 text-sm text-slate-400">名簿照合 → 札番号照合 → 顔照合の進行状況</p>
          <div className="mt-4">
            <ProgressBar value={progress} />
            <p className="mt-2 text-sm">{progress}%</p>
            <StatusBadge tone="info">現在: {stage}</StatusBadge>
          </div>
          <p className="mt-4 text-xs text-slate-500">※ UIデモのため、実際のアップロード・AI推論・DB保存は行いません。</p>
        </Card>
      </section>

      {toast ? <div className="fixed bottom-4 right-4 rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{toast}</div> : null}
    </div>
  );
}
