"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Card, StatusBadge } from "@/components/ui";
import { reviewStudents, teacherMatchRecords } from "@/data/mock-data";

const filters = ["すべて", "要確認のみ", "目つむりあり", "ブレあり", "重複候補"] as const;

export default function ReviewPage() {
  const [selectedFilter, setSelectedFilter] = useState<(typeof filters)[number]>("すべて");
  const [recommended, setRecommended] = useState<Record<string, string>>(
    Object.fromEntries(reviewStudents.map((s) => [s.studentId, s.recommendedShotId]))
  );
  const [teacherStatus, setTeacherStatus] = useState<Record<string, "要確認" | "確定">>(
    Object.fromEntries(teacherMatchRecords.map((r) => [r.id, r.status]))
  );

  const filteredStudents = useMemo(() => {
    if (selectedFilter === "すべて") return reviewStudents;
    return reviewStudents.filter((person) => {
      const tags = person.mainShots.flatMap((s) => s.tags);
      if (selectedFilter === "要確認のみ") return tags.some((t) => ["目つむり", "ブレ", "NG候補", "重複候補"].includes(t));
      if (selectedFilter === "目つむりあり") return tags.includes("目つむり");
      if (selectedFilter === "ブレあり") return tags.includes("ブレ");
      return tags.includes("重複候補");
    });
  }, [selectedFilter]);

  const summary = useMemo(() => {
    const allTags = filteredStudents.flatMap((p) => p.mainShots.flatMap((m) => m.tags));
    return {
      recommend: allTags.filter((t) => t === "推奨").length,
      caution: allTags.filter((t) => t !== "推奨").length,
      people: filteredStudents.length
    };
  }, [filteredStudents]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold">写真レビュー（ベストショット選定）</h3>
            <p className="text-sm text-slate-400">
              生徒・教員・クラブ写真を対象に、札持ち写真と本番カット（複数枚）から推奨写真を最終選定します。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`rounded-full border px-3 py-1 text-xs ${selectedFilter === filter ? "border-blue-400 bg-blue-500/20 text-blue-200" : "border-slate-700 bg-slate-900 text-slate-300"}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </Card>

          {filteredStudents.map((person) => (
            <Card key={person.studentId}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-semibold">
                  {person.kind}：{person.name} / {person.studentId} {person.attendanceNo ? `/ 出席番号 ${person.attendanceNo}` : ""}
                </h4>
                <StatusBadge tone="info">推奨写真: {recommended[person.studentId]}</StatusBadge>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-[170px_1fr]">
                <div>
                  <p className="mb-2 text-xs text-slate-400">札持ち写真（本人確認用）</p>
                  <div className="relative h-36 overflow-hidden rounded-lg border border-slate-700">
                    <Image src={person.placardShot.thumb} alt={person.placardShot.label} fill className="object-cover" unoptimized />
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs text-slate-400">本番カット（複数枚）</p>
                  <div className="grid gap-3 md:grid-cols-3">
                    {person.mainShots.map((shot) => (
                      <button
                        key={shot.id}
                        onClick={() => setRecommended((prev) => ({ ...prev, [person.studentId]: shot.id }))}
                        className={`rounded-lg border p-2 text-left ${recommended[person.studentId] === shot.id ? "border-blue-400 bg-blue-500/10" : "border-slate-700 bg-slate-900/70"}`}
                      >
                        <div className="relative h-28 overflow-hidden rounded-md">
                          <Image src={shot.thumb} alt={shot.label} fill className="object-cover" unoptimized />
                        </div>
                        <p className="mt-2 text-xs font-medium">{shot.label}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {shot.tags.map((tag) => (
                            <StatusBadge key={tag} tone={tag === "推奨" ? "ok" : "warn"}>{tag}</StatusBadge>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <h3 className="text-lg font-semibold">レビューサマリー</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">対象件数: <span className="font-semibold">{summary.people}</span></li>
            <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">推奨タグ: <span className="font-semibold">{summary.recommend}</span></li>
            <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">要確認タグ: <span className="font-semibold">{summary.caution}</span></li>
            <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">手動上書き: <span className="font-semibold">可能</span></li>
          </ul>
        </Card>
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">教員照合レビュー（名簿PDF連携）</h3>
          <StatusBadge tone="info">Teacher Name Matching</StatusBadge>
        </div>
        <p className="text-sm text-slate-400">教員写真から読み取った氏名札テキストと、教員名簿PDFの氏名・教科を照合します。</p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {teacherMatchRecords.map((record) => (
            <div key={record.id} className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
              <div className="grid gap-3 sm:grid-cols-[110px_1fr]">
                <div className="relative h-28 overflow-hidden rounded-md border border-slate-700">
                  <Image src={record.photo} alt={record.id} fill className="object-cover" unoptimized />
                </div>
                <div className="text-sm">
                  <p className="text-xs text-slate-400">検出氏名札テキスト</p>
                  <p className="font-medium">{record.detectedCardText}</p>
                  <p className="mt-1 text-xs text-slate-400">照合氏名 / 教科</p>
                  <p>{record.matchedTeacherName} / {record.matchedSubject}</p>
                  <p className="mt-1 text-xs text-slate-400">信頼度: {(record.confidence * 100).toFixed(0)}%</p>
                  <div className="mt-2 flex items-center gap-2">
                    <StatusBadge tone={teacherStatus[record.id] === "確定" ? "ok" : "warn"}>{teacherStatus[record.id]}</StatusBadge>
                    <button onClick={() => setTeacherStatus((prev) => ({ ...prev, [record.id]: "確定" }))} className="rounded-md border border-slate-700 px-2 py-1 text-xs">確定</button>
                    <button onClick={() => setTeacherStatus((prev) => ({ ...prev, [record.id]: "要確認" }))} className="rounded-md border border-slate-700 px-2 py-1 text-xs">要確認</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
