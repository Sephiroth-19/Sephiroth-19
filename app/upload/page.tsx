"use client";

import { useState } from "react";
import { Card, ProgressBar, StatusBadge } from "@/components/ui";
import {
  defaultDetectionSummary,
  personDetectionSourceFiles,
  processingTypeOptions,
  uploadFiles
} from "@/data/mock-data";
import { DetectionSummary, ProcessingType } from "@/types/demo";

const formByType: Record<ProcessingType, Array<{ label: string; placeholder: string; value?: string }>> = {
  individual: [
    { label: "学校名", placeholder: "例）恵雅学園 小学校", value: "恵雅学園 小学校" },
    { label: "年度", placeholder: "例）2026", value: "2026" },
    { label: "クラス名", placeholder: "例）6年1組", value: "6年1組" },
    { label: "カメラマン名", placeholder: "例）佐藤 健", value: "佐藤 健" },
    { label: "イベント名", placeholder: "例）卒業アルバム個人撮影", value: "卒業アルバム個人撮影" },
    { label: "備考", placeholder: "欠席者・再撮影予定など", value: "4/18 再撮影対象2名" },
    { label: "写真フォルダ", placeholder: "例）/portraits/2026_6-1" },
    { label: "名簿ファイル", placeholder: "例）roster_6-1.xlsx" },
    { label: "教員データ", placeholder: "例）teacher_master.csv" }
  ],
  club: [
    { label: "学校名", placeholder: "例）恵雅学園 小学校", value: "恵雅学園 小学校" },
    { label: "年度", placeholder: "例）2026", value: "2026" },
    { label: "クラブ名", placeholder: "例）サッカー部", value: "サッカー部" },
    { label: "撮影日", placeholder: "例）2026-04-15", value: "2026-04-15" },
    { label: "クラブ写真フォルダ", placeholder: "例）/club/soccer_2026" },
    { label: "候補写真メモ", placeholder: "集合3枚・個別5枚など" },
    { label: "備考", placeholder: "ユニフォーム違いの候補あり" }
  ],
  teacher_matching: [
    { label: "教員写真フォルダ", placeholder: "例）/teachers/2026_cards" },
    { label: "教員名簿PDF", placeholder: "例）teacher_list_2026.pdf" },
    { label: "教科一覧（任意）", placeholder: "例）subject_master.xlsx" },
    { label: "学校名", placeholder: "例）青南中学校", value: "青南中学校" },
    { label: "備考", placeholder: "異体字氏名は要確認" }
  ],
  person_detection: [
    { label: "複数PDFアップロード", placeholder: "2〜3ファイル選択" },
    { label: "対象フォルダ（任意）", placeholder: "例）/group_pdf/2026" },
    { label: "検出モード", placeholder: "人物抽出 / 集合写真解析", value: "人物抽出" },
    { label: "出力形式", placeholder: "Excel出力 / 一覧出力", value: "Excel出力" },
    { label: "備考", placeholder: "名簿突合は次フェーズで実施" }
  ]
};

const helperByType: Record<ProcessingType, string> = {
  individual: "個人写真ワークフロー：名簿照合・札番号照合・顔照合を実行し、レビューへ進みます。",
  club: "クラブ写真ワークフロー：候補写真を比較し、掲載用ベストショットを選定します。",
  teacher_matching: "教員照合ワークフロー：教員写真フォルダと教員名簿PDFを突合して氏名・教科を確認します。",
  person_detection: "人物検出ワークフロー：複数PDF/集合ファイルから人物検出を行い、一覧/Excelに出力します。"
};

export default function UploadPage() {
  const [processingType, setProcessingType] = useState<ProcessingType>("individual");
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("待機中");
  const [toast, setToast] = useState<string | null>(null);
  const [selectedDetectionFiles, setSelectedDetectionFiles] = useState<string[]>([personDetectionSourceFiles[0], personDetectionSourceFiles[1]]);
  const [detectionSummary, setDetectionSummary] = useState<DetectionSummary | null>(null);

  const startProcessing = () => {
    if (started) return;
    setStarted(true);
    setToast("処理を開始しました（デモ）");
    setStage(processingType === "person_detection" ? "人物検出中" : "名簿照合中");

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 10;
        if (processingType !== "person_detection") {
          if (next >= 30 && next < 60) setStage("札番号照合中");
          if (next >= 60 && next < 90) setStage("顔照合中");
          if (next >= 90) setStage("レビュー準備完了");
        } else {
          if (next >= 45 && next < 90) setStage("PDF解析中");
          if (next >= 90) setStage("検出結果生成中");
        }

        if (next >= 100) {
          clearInterval(timer);
          setToast(processingType === "person_detection" ? "人物検出が完了しました（モック）" : "照合処理が完了しました（モック）");
          if (processingType === "person_detection") {
            setDetectionSummary({ ...defaultDetectionSummary, files: selectedDetectionFiles });
          }
          return 100;
        }
        return next;
      });
    }, 450);
  };

  const actionLabel = processingType === "person_detection" ? "検出開始" : "処理開始";

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold">新規案件作成（処理エントリー）</h3>
        <p className="text-sm text-slate-400">処理タイプを選択して必要な入力を行い、業務フローを開始します。</p>

        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold">処理タイプ</p>
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
            {processingTypeOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setProcessingType(opt.id);
                  setProgress(0);
                  setStarted(false);
                  setDetectionSummary(null);
                  setStage("待機中");
                }}
                className={`rounded-lg border p-3 text-left ${processingType === opt.id ? "border-blue-400 bg-blue-500/10" : "border-slate-800 bg-slate-900/60"}`}
              >
                <p className="text-sm font-semibold">{opt.label}</p>
                <p className="mt-1 text-xs text-slate-400">{opt.description}</p>
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">{helperByType[processingType]}</p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {formByType[processingType].map((field) => (
            <label key={field.label} className="text-sm">
              <span className="mb-1 block text-slate-300">{field.label}</span>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-blue-400"
                placeholder={field.placeholder}
                defaultValue={field.value ?? ""}
              />
            </label>
          ))}
        </div>

        {processingType === "person_detection" ? (
          <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/50 p-4">
            <p className="text-sm font-medium">複数PDF選択（デモ）</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {personDetectionSourceFiles.map((file) => {
                const selected = selectedDetectionFiles.includes(file);
                return (
                  <button
                    key={file}
                    onClick={() =>
                      setSelectedDetectionFiles((prev) =>
                        selected ? prev.filter((f) => f !== file) : prev.length < 3 ? [...prev, file] : prev
                      )
                    }
                    className={`rounded-md border px-2 py-1 text-xs ${selected ? "border-blue-400 bg-blue-500/10 text-blue-200" : "border-slate-700"}`}
                  >
                    {file}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-blue-400/40 bg-blue-500/5 p-6 text-center">
            <p className="text-sm font-medium">写真フォルダ / 名簿ファイル / 教員データをドラッグ＆ドロップ（デモ）</p>
            <p className="text-xs text-slate-400">実ファイル送信は行いません。クライアント確認用の疑似UIです。</p>
          </div>
        )}
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
            {actionLabel}
          </button>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold">処理進捗（デモ）</h3>
          <p className="mt-1 text-sm text-slate-400">現在の処理タイプ: {processingTypeOptions.find((t) => t.id === processingType)?.label}</p>
          <div className="mt-4">
            <ProgressBar value={progress} />
            <p className="mt-2 text-sm">{progress}%</p>
            <StatusBadge tone="info">現在: {stage}</StatusBadge>
          </div>
          <p className="mt-4 text-xs text-slate-500">※ UIデモのため、実際のアップロード・AI推論・DB保存は行いません。</p>
        </Card>
      </section>

      {processingType === "person_detection" && detectionSummary ? (
        <Card>
          <h3 className="text-lg font-semibold">検出結果サマリー</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-md border border-slate-800 bg-slate-900/60 p-3 text-sm">
              <p className="text-xs text-slate-400">処理ファイル</p>
              <p>{detectionSummary.files.join(" / ")}</p>
            </div>
            <div className="rounded-md border border-slate-800 bg-slate-900/60 p-3 text-sm">
              <p className="text-xs text-slate-400">検出人数</p>
              <p>{detectionSummary.detectedCount}名</p>
            </div>
            <div className="rounded-md border border-slate-800 bg-slate-900/60 p-3 text-sm">
              <p className="text-xs text-slate-400">出力形式</p>
              <p>{detectionSummary.outputFormat}</p>
            </div>
            <div className="rounded-md border border-slate-800 bg-slate-900/60 p-3 text-sm">
              <p className="text-xs text-slate-400">出力ファイル</p>
              <p>{detectionSummary.outputFileName}</p>
            </div>
          </div>
          <button className="mt-4 rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm">結果をダウンロード（モック）</button>
        </Card>
      ) : null}

      {toast ? <div className="fixed bottom-4 right-4 rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{toast}</div> : null}
    </div>
  );
}
