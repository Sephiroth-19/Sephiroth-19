import Link from "next/link";
import { Card, ProgressBar, StatusBadge } from "@/components/ui";
import { dashboardMetrics, projects, valueCards, workflowSteps } from "@/data/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Card className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-xs text-blue-200">恵雅堂 クライアント確認用デモ</p>
          <h3 className="mt-1 text-2xl font-semibold">学校写真・アルバム制作向けワークフロー支援</h3>
          <p className="mt-3 text-sm text-slate-300">
            本システムは「写真アップロード → 名簿/札番号/顔照合 → ベストショット選定 → レイアウト確認 → 書き出し前確認」
            を一連で支援する業務UIです。
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <StatusBadge tone="info">名簿照合</StatusBadge>
            <StatusBadge tone="info">札番号照合</StatusBadge>
            <StatusBadge tone="info">顔照合</StatusBadge>
            <StatusBadge tone="ok">推奨写真選定</StatusBadge>
            <StatusBadge tone="warn">書き出し前確認</StatusBadge>
          </div>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
          <p className="mb-3 text-sm font-medium">業務状況（軽量表示）</p>
          <div className="space-y-3">
            {dashboardMetrics.map((metric) => (
              <div key={metric.label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
                <p className="text-xs text-slate-400">{metric.label}</p>
                <p className="text-xl font-semibold">{metric.value}</p>
                <p className="text-xs text-slate-500">{metric.delta}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold">業務フロー</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {workflowSteps.map((step, index) => (
            <div key={step} className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
              <p className="text-xs text-slate-400">STEP {index + 1}</p>
              <p className="mt-1 text-sm font-medium">{step}</p>
            </div>
          ))}
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {valueCards.map((card) => (
          <Card key={card.title}>
            <h4 className="font-semibold">{card.title}</h4>
            <p className="mt-2 text-sm text-slate-300">{card.body}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">直近案件（軽量）</h3>
            <Link href="/upload" className="text-sm text-blue-300 hover:text-blue-200">新規案件作成</Link>
          </div>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{project.id} / {project.school} {project.className}</p>
                  <StatusBadge tone={project.status === "レビュー待ち" ? "warn" : project.status === "完了" ? "ok" : "default"}>{project.status}</StatusBadge>
                </div>
                <p className="mt-1 text-xs text-slate-400">担当: {project.photographer} / 取込日: {project.uploadedAt}</p>
                <div className="mt-2"><ProgressBar value={project.progress} /></div>
                <p className="mt-1 text-xs text-slate-400">進捗 {project.progress}%</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold">照合チェック状況</h3>
          <p className="mt-1 text-sm text-slate-400">名簿・札番号・顔照合の確認結果</p>
          <div className="mt-3 space-y-2">
            {projects.map((project) => (
              <div key={project.id} className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs">
                <p className="mb-1 font-medium">{project.id}</p>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone={project.matchState.roster === "完了" ? "ok" : "warn"}>名簿照合: {project.matchState.roster}</StatusBadge>
                  <StatusBadge tone={project.matchState.tag === "完了" ? "ok" : "warn"}>札番号照合: {project.matchState.tag}</StatusBadge>
                  <StatusBadge tone={project.matchState.face === "完了" ? "ok" : "warn"}>顔照合: {project.matchState.face}</StatusBadge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-2">
            <Link href="/review" className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm hover:border-blue-400/60">写真レビューへ</Link>
            <Link href="/layout-review" className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm hover:border-blue-400/60">レイアウト確認へ</Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
