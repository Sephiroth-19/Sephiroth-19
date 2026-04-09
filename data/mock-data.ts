import {
  LayoutStudent,
  MetadataRecord,
  NavItem,
  Project,
  QualityIssue,
  StudentReview,
  SummaryMetric,
  UploadFile
} from "@/types/demo";

export const navItems: NavItem[] = [
  { href: "/", label: "ダッシュボード", subtitle: "業務全体" },
  { href: "/upload", label: "新規案件", subtitle: "写真アップロード" },
  { href: "/review", label: "写真レビュー", subtitle: "推奨写真選定" },
  { href: "/layout-review", label: "レイアウト確認", subtitle: "アルバム配置" },
  { href: "/search", label: "検索・メタデータ", subtitle: "人物検索" },
  { href: "/quality", label: "重複・品質チェック", subtitle: "最終確認" }
];

export const dashboardMetrics: SummaryMetric[] = [
  { label: "本日取込案件", value: "4", delta: "先生データ未取込 1件", trend: "neutral" },
  { label: "照合確認待ち", value: "2", delta: "札番号差異あり", trend: "down" }
];

export const workflowSteps = [
  "写真アップロード（生徒・先生）",
  "名簿照合・札番号照合・顔照合",
  "ベストショット選定（AI + 手動確認）",
  "レイアウト確認（クラス別配置）",
  "書き出し前チェック"
];

export const valueCards = [
  {
    title: "名簿・札番号照合",
    body: "名簿ファイルと札持ち写真を突合し、ID不一致を早期発見します。"
  },
  {
    title: "ベストショット選定",
    body: "本番カット3〜5枚から推奨写真を提示し、担当者が最終決定します。"
  },
  {
    title: "写真レビュー効率化",
    body: "目つむり・ブレ・NG候補・重複候補を一覧で確認できます。"
  },
  {
    title: "レイアウト確認",
    body: "学級ごとの並び順・サイズ・背景トーンを調整してアルバム向けに確認できます。"
  }
];

export const projects: Project[] = [
  {
    id: "KG-2026-041",
    school: "恵雅学園 小学校",
    className: "6年1組",
    year: 2026,
    photographer: "佐藤 健",
    status: "レビュー待ち",
    uploadedAt: "2026-04-06",
    progress: 72,
    matchState: { roster: "完了", tag: "完了", face: "未確認" }
  },
  {
    id: "KG-2026-038",
    school: "青南中学校",
    className: "3年2組",
    year: 2026,
    photographer: "井上 美咲",
    status: "AI処理中",
    uploadedAt: "2026-04-07",
    progress: 48,
    matchState: { roster: "完了", tag: "未確認", face: "未確認" }
  },
  {
    id: "KG-2026-036",
    school: "桜丘高校",
    className: "2年5組",
    year: 2026,
    photographer: "田中 啓",
    status: "処理待ち",
    uploadedAt: "2026-04-08",
    progress: 18,
    matchState: { roster: "未確認", tag: "未確認", face: "未確認" }
  }
];

export const uploadFiles: UploadFile[] = [
  { id: "u1", fileName: "2026_6-1_student_portraits.zip", size: "2.3GB", type: "写真", status: "確認済み" },
  { id: "u2", fileName: "2026_6-1_roster.xlsx", size: "240KB", type: "名簿", status: "確認済み" },
  { id: "u3", fileName: "2026_teacher_master.csv", size: "120KB", type: "先生データ", status: "待機" }
];

const shotBase = "https://images.unsplash.com/photo-";

export const reviewStudents: StudentReview[] = [
  {
    studentId: "ST-6101",
    name: "山田 花",
    kind: "生徒",
    className: "6年1組",
    attendanceNo: 1,
    placardShot: { id: "p1", label: "札持ち", thumb: `${shotBase}1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80`, tags: [] },
    mainShots: [
      { id: "s1", label: "本番A", thumb: `${shotBase}1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80`, tags: ["推奨"] },
      { id: "s2", label: "本番B", thumb: `${shotBase}1519345182560-3f2917c472ef?auto=format&fit=crop&w=300&q=80`, tags: ["目つむり"] },
      { id: "s3", label: "本番C", thumb: `${shotBase}1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80`, tags: ["重複候補"] },
      { id: "s7", label: "本番D", thumb: `${shotBase}1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80`, tags: ["ブレ"] }
    ],
    recommendedShotId: "s1"
  },
  {
    studentId: "ST-6102",
    name: "鈴木 陽斗",
    kind: "生徒",
    className: "6年1組",
    attendanceNo: 2,
    placardShot: { id: "p2", label: "札持ち", thumb: `${shotBase}1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80`, tags: [] },
    mainShots: [
      { id: "s4", label: "本番A", thumb: `${shotBase}1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80`, tags: ["ブレ"] },
      { id: "s5", label: "本番B", thumb: `${shotBase}1463453091185-61582044d556?auto=format&fit=crop&w=300&q=80`, tags: ["推奨"] },
      { id: "s6", label: "本番C", thumb: `${shotBase}1499952127939-9bbf5af6c51c?auto=format&fit=crop&w=300&q=80`, tags: ["NG候補"] }
    ],
    recommendedShotId: "s5"
  },
  {
    studentId: "TE-1201",
    name: "高橋 真理",
    kind: "教員",
    className: "教職員",
    attendanceNo: null,
    placardShot: { id: "p3", label: "氏名札", thumb: `${shotBase}1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80`, tags: [] },
    mainShots: [
      { id: "t1", label: "本番A", thumb: `${shotBase}1595152772835-219674b2a8a6?auto=format&fit=crop&w=300&q=80`, tags: ["推奨"] },
      { id: "t2", label: "本番B", thumb: `${shotBase}1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80`, tags: ["重複候補"] }
    ],
    recommendedShotId: "t1"
  }
];

export const layoutStudents: LayoutStudent[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `L-${i + 1}`,
  name: `6-1 生徒${i + 1}`,
  seat: `${Math.floor(i / 5) + 1}-${(i % 5) + 1}`,
  thumb: `${shotBase}1521119989659-a83eee488004?auto=format&fit=crop&w=200&q=80`
}));

export const metadataRecords: MetadataRecord[] = [
  {
    id: "ST-6101",
    name: "山田 花",
    className: "6年1組",
    shotDate: "2026-04-05",
    location: "第2撮影室",
    tags: ["卒業アルバム", "笑顔"],
    result: "推奨",
    thumb: `${shotBase}1542206395-9feb3edaa68d?auto=format&fit=crop&w=250&q=80`
  },
  {
    id: "ST-6102",
    name: "鈴木 陽斗",
    className: "6年1組",
    shotDate: "2026-04-05",
    location: "第2撮影室",
    tags: ["要再確認", "白背景"],
    result: "要確認",
    thumb: `${shotBase}1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80`
  },
  {
    id: "TE-1201",
    name: "高橋 真理",
    className: "教職員",
    shotDate: "2026-04-03",
    location: "会議室A",
    tags: ["先生写真", "職員台帳連携"],
    result: "推奨",
    thumb: `${shotBase}1487412720507-e7ab37603c6f?auto=format&fit=crop&w=250&q=80`
  }
];

export const qualityIssues: QualityIssue[] = [
  {
    id: "Q-1",
    type: "重複候補",
    leftThumb: `${shotBase}1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80`,
    rightThumb: `${shotBase}1463453091185-61582044d556?auto=format&fit=crop&w=250&q=80`,
    student: "鈴木 陽斗",
    className: "6年1組"
  },
  {
    id: "Q-2",
    type: "目つむり",
    leftThumb: `${shotBase}1519345182560-3f2917c472ef?auto=format&fit=crop&w=250&q=80`,
    rightThumb: `${shotBase}1499952127939-9bbf5af6c51c?auto=format&fit=crop&w=250&q=80`,
    student: "山田 花",
    className: "6年1組"
  },
  {
    id: "Q-3",
    type: "NG候補",
    leftThumb: `${shotBase}1524504388940-b1c1722653e1?auto=format&fit=crop&w=250&q=80`,
    rightThumb: `${shotBase}1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80`,
    student: "佐々木 蒼",
    className: "6年2組"
  }
];
