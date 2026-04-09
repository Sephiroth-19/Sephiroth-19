"use client";

import { useState } from "react";
import { Card, ProgressBar, StatusBadge } from "@/components/ui";
import { uploadFiles } from "@/data/mock-data";

export default function UploadPage() {
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const startProcessing = () => {
    if (started) return;
    setStarted(true);
    setToast("処理を開始しました（デモ挙動）");

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 12;
        if (next >= 100) {
          clearInterval(timer);
          setToast("AI照合処理が完了しました（モック）");
          return 100;
        }
        return next;
      });
    }, 400);
  };

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold">新規案件作成</h3>
        <p className="text-sm text-slate-400">学校写真案件を登録し、アップロード処理を開始します。</p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            "学校名",
            "年度",
            "クラス名",
            "撮影担当者",
            "写真フォルダ",
            "名簿ファイル",
            "先生データ",
            "備考"
          ].map((label) => (
            <label key={label} className="text-sm">
              <span className="mb-1 block text-slate-300">{label}</span>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-blue-400"
                placeholder={`${label}を入力`}
                defaultValue={
                  label === "学校名"
                    ? "恵雅学園 小学校"
                    : label === "年度"
                      ? "2026"
                      : label === "クラス名"
                        ? "6年1組"
                        : label === "撮影担当者"
                          ? "佐藤 健"
                          : ""
                }
              />
            </label>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-dashed border-blue-400/40 bg-blue-500/5 p-6 text-center">
          <p className="text-sm font-medium">ドラッグ＆ドロップでファイル追加（デモ）</p>
          <p className="text-xs text-slate-400">実ファイル送信は行いません。UI確認用のプレースホルダーです。</p>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold">アップロード済みファイル</h3>
        <ul className="mt-3 space-y-2">
          {uploadFiles.map((file) => (
            <li key={file.id} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-sm">
              <div>
                <p className="font-medium">{file.fileName}</p>
                <p className="text-xs text-slate-400">{file.type} / {file.size}</p>
              </div>
              <StatusBadge tone={file.status === "確認済み" ? "ok" : file.status === "エラー" ? "danger" : "warn"}>
                {file.status}
              </StatusBadge>
            </li>
          ))}
        </ul>

        <button onClick={startProcessing} className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400">
          処理開始
        </button>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold">処理進捗（シミュレーション）</h3>
        <p className="mt-1 text-sm text-slate-400">名簿照合 / タグ番号一致 / 品質判定の進捗</p>
        <div className="mt-4">
          <ProgressBar value={progress} />
          <p className="mt-2 text-sm">{progress}%</p>
        </div>
        <p className="mt-4 text-xs text-slate-500">※ このページはクライアント確認用のデモ画面です。実処理は実装していません。</p>
      </Card>

      {toast ? <div className="fixed bottom-4 right-4 rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{toast}</div> : null}
    </div>
  );
}
