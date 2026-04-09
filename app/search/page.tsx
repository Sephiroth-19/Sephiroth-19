"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Card, StatusBadge } from "@/components/ui";
import { metadataRecords } from "@/data/mock-data";
import { MetadataRecord } from "@/types/demo";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MetadataRecord | null>(null);
  const [saved, setSaved] = useState(false);

  const filtered = useMemo(() => {
    if (!query) return metadataRecords;
    return metadataRecords.filter((r) => [r.name, r.id, r.className, r.shotDate].join(" ").includes(query));
  }, [query]);

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold">検索・メタデータ編集</h3>
        <p className="text-sm text-slate-400">氏名 / ID / クラス / 撮影日で検索できます。</p>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {[
            { placeholder: "氏名", value: query },
            { placeholder: "ID", value: "" },
            { placeholder: "クラス", value: "" },
            { placeholder: "撮影日", value: "" }
          ].map((field, idx) => (
            <input
              key={field.placeholder}
              value={idx === 0 ? query : field.value}
              onChange={(e) => idx === 0 && setQuery(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
              placeholder={field.placeholder}
            />
          ))}
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-400">
              <tr>
                <th className="px-2 py-2">サムネイル</th>
                <th className="px-2 py-2">氏名</th>
                <th className="px-2 py-2">ID</th>
                <th className="px-2 py-2">クラス</th>
                <th className="px-2 py-2">判定結果</th>
                <th className="px-2 py-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-slate-800">
                  <td className="px-2 py-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md border border-slate-700">
                      <Image src={r.thumb} alt={r.name} fill className="object-cover" unoptimized />
                    </div>
                  </td>
                  <td className="px-2 py-3">{r.name}</td>
                  <td className="px-2 py-3">{r.id}</td>
                  <td className="px-2 py-3">{r.className}</td>
                  <td className="px-2 py-3"><StatusBadge tone={r.result === "推奨" ? "ok" : "warn"}>{r.result}</StatusBadge></td>
                  <td className="px-2 py-3">
                    <button onClick={() => { setSelected(r); setSaved(false); }} className="rounded-md border border-slate-700 px-2 py-1 text-xs">
                      メタデータ編集
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {selected ? (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setSelected(null)}>
          <div className="absolute right-0 top-0 h-full w-full max-w-md border-l border-slate-700 bg-slate-950 p-5" onClick={(e) => e.stopPropagation()}>
            <h4 className="text-lg font-semibold">メタデータ詳細</h4>
            <div className="mt-4 space-y-3 text-sm">
              {[
                ["氏名", selected.name],
                ["ID", selected.id],
                ["クラス", selected.className],
                ["タグ", selected.tags.join(", ")],
                ["撮影日", selected.shotDate],
                ["撮影場所", selected.location],
                ["判定結果", selected.result]
              ].map(([label, value]) => (
                <label key={label} className="block">
                  <span className="mb-1 block text-slate-400">{label}</span>
                  <input defaultValue={value} className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2" />
                </label>
              ))}
            </div>
            <button
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 1500);
              }}
              className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold"
            >
              保存
            </button>
            {saved ? <p className="mt-2 text-sm text-emerald-300">保存しました</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
