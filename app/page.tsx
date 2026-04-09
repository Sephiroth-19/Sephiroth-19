import Link from "next/link";
import { Card, ProgressBar, StatusBadge } from "@/components/ui";
import { dashboardMetrics, projects, workflowSteps } from "@/data/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.label}>
            <p className="text-sm text-slate-300">{metric.label}</p>
            <p className="mt-1 text-3xl font-semibold">{metric.value}</p>
            <p className="mt-2 text-xs text-slate-400">{metric.delta}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <h3 className="text-lg font-semibold">業務フロー概要</h3>
          <p className="mt-1 text-sm text-slate-400">現場での処理手順を想定した標準フロー</p>
          <ol className="mt-4 space-y-3">
            {workflowSteps.map((step, index) => (
              <li key={step} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-200">
                  {index + 1}
                </div>
                <p className="text-sm">{step.replace(/^\d+\.\s/, "")}</p>
              </li>
            ))}
          </ol>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold">主要メニュー</h3>
          <div className="mt-4 grid gap-3">
            {[
              { href: "/upload", label: "新規案件作成" },
              { href: "/review", label: "写真レビュー" },
              { href: "/layout-review", label: "レイアウト確認" },
              { href: "/quality", label: "重複チェック" }
            ].map((action) => (
              <Link key={action.href} href={action.href} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm hover:border-blue-400/50 hover:bg-blue-500/10">
                {action.label}
              </Link>
            ))}
          </div>
        </Card>
      </section>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">直近案件</h3>
          <StatusBadge tone="info">Mock Data</StatusBadge>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-400">
              <tr>
                <th className="px-2 py-2">案件ID</th>
                <th className="px-2 py-2">学校 / クラス</th>
                <th className="px-2 py-2">担当</th>
                <th className="px-2 py-2">進捗</th>
                <th className="px-2 py-2">状態</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t border-slate-800">
                  <td className="px-2 py-3 font-medium">{project.id}</td>
                  <td className="px-2 py-3">{project.school} / {project.className}</td>
                  <td className="px-2 py-3">{project.photographer}</td>
                  <td className="px-2 py-3">
                    <ProgressBar value={project.progress} />
                    <p className="mt-1 text-xs text-slate-400">{project.progress}%</p>
                  </td>
                  <td className="px-2 py-3">
                    <StatusBadge tone={project.status === "完了" ? "ok" : project.status === "レビュー待ち" ? "warn" : "default"}>{project.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
