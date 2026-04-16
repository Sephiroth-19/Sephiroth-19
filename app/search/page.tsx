"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Card, StatusBadge } from "@/components/ui";
import { metadataRecords } from "@/data/mock-data";
import { MetadataRecord } from "@/types/demo";

export default function SearchPage() {
  const [nameQuery, setNameQuery] = useState("");
  const [idQuery, setIdQuery] = useState("");
  const [classQuery, setClassQuery] = useState("");
  const [dateQuery, setDateQuery] = useState("");
  const [selected, setSelected] = useState<MetadataRecord | null>(null);
  const [saved, setSaved] = useState(false);
  const [samePersonHint, setSamePersonHint] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return metadataRecords.filter((r) => {
      return (
        (!nameQuery || r.name.includes(nameQuery)) &&
        (!idQuery || r.id.includes(idQuery)) &&
        (!classQuery || r.className.includes(classQuery)) &&
        (!dateQuery || r.shotDate.includes(dateQuery))
      );
    });
  }, [nameQuery, idQuery, classQuery, dateQuery]);

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold">検索・メタデータ編集</h3>
        <p className="text-sm text-slate-400">名前 / ID / クラス / 撮影日 / 人物タグで検索し、メタデータを編集できます。</p>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <input value={nameQuery} onChange={(e) => setNameQuery(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm" placeholder="名前検索" />
          <input value={idQuery} onChange={(e) => setIdQuery(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm" placeholder="ID検索" />
          <input value={classQuery} onChange={(e) => setClassQuery(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm" placeholder="クラス検索" />
          <input value={dateQuery} onChange={(e) => setDateQuery(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm" placeholder="撮影日（YYYY-MM-DD）" />
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-400">
              <tr>
                <th className="px-2 py-2">サムネイル</th>
                <th className="px-2 py-2">名前</th>
                <th className="px-2 py-2">ID</th>
                <th className="px-2 py-2">クラス</th>
                <th className="px-2 py-2">人物タグ</th>
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
                  <td className="px-2 py-3 text-xs">{r.tags.join(" / ")}</td>
                  <td className="px-2 py-3"><StatusBadge tone={r.result === "推奨" ? "ok" : "warn"}>{r.result}</StatusBadge></td>
                  <td className="px-2 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => { setSelected(r); setSaved(false); }} className="rounded-md border border-slate-700 px-2 py-1 text-xs">メタデータ編集</button>
                      <button onClick={() => setSamePersonHint(`${r.name} の同一人物候補を3件表示（モック）`)} className="rounded-md border border-blue-400/40 bg-blue-500/10 px-2 py-1 text-xs text-blue-200">同一人物検索</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {samePersonHint ? <div className="rounded-lg border border-blue-400/40 bg-blue-500/10 px-4 py-3 text-sm text-blue-200">{samePersonHint}</div> : null}

      {selected ? (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setSelected(null)}>
          <div className="absolute right-0 top-0 h-full w-full max-w-md border-l border-slate-700 bg-slate-950 p-5" onClick={(e) => e.stopPropagation()}>
            <h4 className="text-lg font-semibold">メタデータ詳細</h4>
            <div className="mt-4 space-y-3 text-sm">
              {[
                ["名前", selected.name],
                ["ID", selected.id],
                ["クラス", selected.className],
                ["人物タグ", selected.tags.join(", ")],
                ["撮影日", selected.shotDate],
                ["撮影場所", selected.location],
                ["判定結果", selected.result],
                ["撮影機材", "85mm / F4.0 / ISO200"],
                ["備考", "背景補正済み"]
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
