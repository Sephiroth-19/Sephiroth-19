"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Card, StatusBadge } from "@/components/ui";
import { reviewStudents } from "@/data/mock-data";

const filters = ["すべて", "要確認のみ", "目つむりあり", "ブレあり", "重複候補"] as const;

export default function ReviewPage() {
  const [selectedFilter, setSelectedFilter] = useState<(typeof filters)[number]>("すべて");
  const [recommended, setRecommended] = useState<Record<string, string>>(
    Object.fromEntries(reviewStudents.map((s) => [s.studentId, s.recommendedShotId]))
  );

  const filteredStudents = useMemo(() => {
    if (selectedFilter === "すべて") return reviewStudents;
    return reviewStudents.filter((student) => {
      const tags = student.mainShots.flatMap((s) => s.tags);
      if (selectedFilter === "要確認のみ") return tags.some((t) => ["目つむり", "ブレ", "NG候補", "重複候補"].includes(t));
      if (selectedFilter === "目つむりあり") return tags.includes("目つむり");
      if (selectedFilter === "ブレあり") return tags.includes("ブレ");
      return tags.includes("重複候補");
    });
  }, [selectedFilter]);

  const summary = useMemo(() => {
    const tags = filteredStudents.flatMap((s) => s.mainShots.flatMap((m) => m.tags));
    return {
      recommend: tags.filter((t) => t === "推奨").length,
      caution: tags.filter((t) => t !== "推奨").length
    };
  }, [filteredStudents]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
      <div className="space-y-6">
        <Card>
          <h3 className="text-lg font-semibold">写真レビュー（AI判定）</h3>
          <p className="text-sm text-slate-400">札持ち写真と本番カットを照合し、推奨写真を確認します。</p>
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

        {filteredStudents.map((student) => (
          <Card key={student.studentId}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-semibold">{student.name} / {student.studentId} / 出席番号 {student.attendanceNo}</h4>
              <StatusBadge tone="info">AI推奨写真: {recommended[student.studentId]}</StatusBadge>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[160px_1fr]">
              <div>
                <p className="mb-2 text-xs text-slate-400">札持ち写真</p>
                <div className="relative h-36 overflow-hidden rounded-lg border border-slate-700">
                  <Image src={student.placardShot.thumb} alt={student.placardShot.label} fill className="object-cover" unoptimized />
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs text-slate-400">本番カット</p>
                <div className="grid gap-3 md:grid-cols-3">
                  {student.mainShots.map((shot) => (
                    <button
                      key={shot.id}
                      onClick={() => setRecommended((prev) => ({ ...prev, [student.studentId]: shot.id }))}
                      className={`rounded-lg border p-2 text-left ${recommended[student.studentId] === shot.id ? "border-blue-400 bg-blue-500/10" : "border-slate-700 bg-slate-900/70"}`}
                    >
                      <div className="relative h-28 overflow-hidden rounded-md">
                        <Image src={shot.thumb} alt={shot.label} fill className="object-cover" unoptimized />
                      </div>
                      <p className="mt-2 text-xs">{shot.label}</p>
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
        <h3 className="text-lg font-semibold">AI判定サマリー</h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">推奨タグ数: <span className="font-semibold">{summary.recommend}</span></li>
          <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">要確認タグ数: <span className="font-semibold">{summary.caution}</span></li>
          <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">手動切替可能: <span className="font-semibold">はい</span></li>
          <li className="rounded-md border border-slate-800 bg-slate-900/70 p-2">ステータス: <span className="font-semibold text-amber-300">レビュー中</span></li>
        </ul>
      </Card>
    </div>
  );
}
