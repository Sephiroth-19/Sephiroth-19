import { LayoutStudent, MetadataRecord, NavItem, Project, QualityIssue, StudentReview, SummaryMetric, UploadFile } from "@/types/demo";

export const navItems: NavItem[] = [
  { href: "/", label: "ダッシュボード", subtitle: "Home" },
  { href: "/upload", label: "新規案件", subtitle: "Upload" },
  { href: "/review", label: "写真レビュー", subtitle: "AI Review" },
  { href: "/layout-review", label: "レイアウト確認", subtitle: "Layout" },
  { href: "/search", label: "検索・メタデータ", subtitle: "Metadata" },
  { href: "/quality", label: "重複・品質チェック", subtitle: "QC" }
];

export const dashboardMetrics: SummaryMetric[] = [
  { label: "アップロード案件数", value: "18", delta: "+3 今週", trend: "up" },
  { label: "処理待ち", value: "6", delta: "名簿照合待ち 2", trend: "neutral" },
  { label: "レビュー待ち", value: "9", delta: "要確認 32件", trend: "down" },
  { label: "完了案件", value: "41", delta: "今月", trend: "up" }
];

export const workflowSteps = [
  "1. 写真・名簿アップロード",
  "2. AI照合・判定",
  "3. 写真レビュー",
  "4. レイアウト確認",
  "5. 書き出し"
];

export const projects: Project[] = [
  { id: "KG-2026-041", school: "恵雅学園 小学校", className: "6年1組", year: 2026, photographer: "佐藤 健", status: "レビュー待ち", uploadedAt: "2026-04-06", progress: 72 },
  { id: "KG-2026-038", school: "青南中学校", className: "3年2組", year: 2026, photographer: "井上 美咲", status: "AI処理中", uploadedAt: "2026-04-07", progress: 48 },
  { id: "KG-2026-036", school: "桜丘高校", className: "2年5組", year: 2026, photographer: "田中 啓", status: "処理待ち", uploadedAt: "2026-04-08", progress: 18 },
  { id: "KG-2026-029", school: "第一ひかり小学校", className: "6年3組", year: 2026, photographer: "村上 真一", status: "完了", uploadedAt: "2026-03-30", progress: 100 }
];

export const uploadFiles: UploadFile[] = [
  { id: "u1", fileName: "2026_6-1_portraits.zip", size: "2.3GB", type: "写真", status: "確認済み" },
  { id: "u2", fileName: "roster_6-1.xlsx", size: "240KB", type: "名簿", status: "確認済み" },
  { id: "u3", fileName: "teachers_6th_grade.csv", size: "80KB", type: "先生データ", status: "待機" }
];

const shotBase = "https://images.unsplash.com/photo-";

export const reviewStudents: StudentReview[] = [
  {
    studentId: "ST-6101",
    name: "山田 花",
    className: "6年1組",
    attendanceNo: 1,
    placardShot: { id: "p1", label: "札持ち", thumb: `${shotBase}1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80`, tags: [] },
    mainShots: [
      { id: "s1", label: "カットA", thumb: `${shotBase}1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80`, tags: ["推奨"] },
      { id: "s2", label: "カットB", thumb: `${shotBase}1519345182560-3f2917c472ef?auto=format&fit=crop&w=300&q=80`, tags: ["目つむり"] },
      { id: "s3", label: "カットC", thumb: `${shotBase}1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80`, tags: ["重複候補"] }
    ],
    recommendedShotId: "s1"
  },
  {
    studentId: "ST-6102",
    name: "鈴木 陽斗",
    className: "6年1組",
    attendanceNo: 2,
    placardShot: { id: "p2", label: "札持ち", thumb: `${shotBase}1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80`, tags: [] },
    mainShots: [
      { id: "s4", label: "カットA", thumb: `${shotBase}1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80`, tags: ["ブレ"] },
      { id: "s5", label: "カットB", thumb: `${shotBase}1463453091185-61582044d556?auto=format&fit=crop&w=300&q=80`, tags: ["推奨"] },
      { id: "s6", label: "カットC", thumb: `${shotBase}1499952127939-9bbf5af6c51c?auto=format&fit=crop&w=300&q=80`, tags: ["NG候補"] }
    ],
    recommendedShotId: "s5"
  }
];

export const layoutStudents: LayoutStudent[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `L-${i + 1}`,
  name: `生徒 ${i + 1}`,
  seat: `${Math.floor(i / 5) + 1}-${(i % 5) + 1}`,
  thumb: `${shotBase}1521119989659-a83eee488004?auto=format&fit=crop&w=200&q=80`
}));

export const metadataRecords: MetadataRecord[] = [
  { id: "ST-6101", name: "山田 花", className: "6年1組", shotDate: "2026-04-05", location: "第2撮影室", tags: ["卒業アルバム", "笑顔"], result: "推奨", thumb: `${shotBase}1542206395-9feb3edaa68d?auto=format&fit=crop&w=250&q=80` },
  { id: "ST-6102", name: "鈴木 陽斗", className: "6年1組", shotDate: "2026-04-05", location: "第2撮影室", tags: ["要再確認", "白背景"], result: "要確認", thumb: `${shotBase}1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80` },
  { id: "TE-1201", name: "高橋 真理", className: "教職員", shotDate: "2026-04-03", location: "会議室A", tags: ["先生写真"], result: "推奨", thumb: `${shotBase}1487412720507-e7ab37603c6f?auto=format&fit=crop&w=250&q=80` }
];

export const qualityIssues: QualityIssue[] = [
  { id: "Q-1", type: "重複候補", leftThumb: `${shotBase}1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80`, rightThumb: `${shotBase}1463453091185-61582044d556?auto=format&fit=crop&w=250&q=80`, student: "鈴木 陽斗", className: "6年1組" },
  { id: "Q-2", type: "ピンボケ", leftThumb: `${shotBase}1499952127939-9bbf5af6c51c?auto=format&fit=crop&w=250&q=80`, rightThumb: `${shotBase}1519345182560-3f2917c472ef?auto=format&fit=crop&w=250&q=80`, student: "山田 花", className: "6年1組" },
  { id: "Q-3", type: "露出不安定", leftThumb: `${shotBase}1524504388940-b1c1722653e1?auto=format&fit=crop&w=250&q=80`, rightThumb: `${shotBase}1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80`, student: "佐々木 蒼", className: "6年2組" }
];
