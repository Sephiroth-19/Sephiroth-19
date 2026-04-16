import {
  DetectionSummary,
  LayoutStudent,
  MetadataRecord,
  NavItem,
  ProcessingType,
  Project,
  QualityIssue,
  StudentReview,
  SummaryMetric,
  TeacherMatchRecord,
  UploadFile
} from "@/types/demo";

export const navItems: NavItem[] = [
  { href: "/", label: "ダッシュボード", subtitle: "業務全体" },
  { href: "/upload", label: "新規案件", subtitle: "処理タイプ選択" },
  { href: "/review", label: "写真レビュー", subtitle: "推奨写真・教員照合" },
  { href: "/layout-review", label: "レイアウト確認", subtitle: "アルバム配置" },
  { href: "/search", label: "検索・メタデータ", subtitle: "人物検索" },
  { href: "/quality", label: "重複・品質チェック", subtitle: "最終確認" }
];

export const processingTypeOptions: { id: ProcessingType; label: string; description: string }[] = [
  { id: "individual", label: "個人写真", description: "生徒・教員の個人写真を照合してベストショットを選定" },
  { id: "club", label: "クラブ写真", description: "クラブ集合/個別候補から掲載用写真を選定" },
  { id: "teacher_matching", label: "教員照合", description: "教員写真フォルダと教員名簿PDFを照合" },
  { id: "person_detection", label: "人物検出", description: "複数PDF/集合ファイルから人物検出して一覧化" }
];

export const dashboardMetrics: SummaryMetric[] = [
  { label: "本日取込案件", value: "6", delta: "個人2 / クラブ1 / 教員照合2 / 人物検出1", trend: "neutral" },
  { label: "照合確認待ち", value: "3", delta: "教員照合の要確認 4件", trend: "down" }
];

export const workflowSteps = [
  "処理タイプ選択（個人写真 / クラブ写真 / 教員照合 / 人物検出）",
  "ファイル取込（写真フォルダ・名簿・PDF）",
  "照合/判定（名簿・札番号・顔・教員名）",
  "写真レビュー / レイアウト確認",
  "書き出し・一覧出力"
];

export const valueCards = [
  { title: "個人写真", body: "札持ち写真と本番カットを照合し、推奨写真を選定します。" },
  { title: "クラブ写真", body: "クラブごとの候補写真を比較して掲載用を効率よく確定します。" },
  { title: "教員照合", body: "教員写真 + 名簿PDFから氏名・教科を対応付けし確認できます。" },
  { title: "人物検出", body: "複数PDF/集合ファイルから人物数を抽出し、Excel/一覧に出力します。" }
];

export const projects: Project[] = [
  {
    id: "KG-2026-041",
    school: "恵雅学園 小学校",
    className: "6年1組",
    year: 2026,
    photographer: "佐藤 健",
    status: "レビュー待ち",
    uploadedAt: "2026-04-14",
    progress: 72,
    workflowType: "個人写真",
    matchState: { roster: "完了", tag: "完了", face: "未確認" }
  },
  {
    id: "KG-2026-045",
    school: "恵雅学園 小学校",
    className: "サッカー部",
    year: 2026,
    photographer: "村上 真一",
    status: "AI処理中",
    uploadedAt: "2026-04-15",
    progress: 54,
    workflowType: "クラブ写真",
    matchState: { roster: "完了", tag: "未確認", face: "未確認" }
  },
  {
    id: "KG-2026-046",
    school: "青南中学校",
    className: "教職員",
    year: 2026,
    photographer: "井上 美咲",
    status: "レビュー待ち",
    uploadedAt: "2026-04-15",
    progress: 66,
    workflowType: "教員照合",
    matchState: { roster: "完了", tag: "完了", face: "完了" }
  },
  {
    id: "KG-2026-047",
    school: "桜丘高校",
    className: "学年集合",
    year: 2026,
    photographer: "田中 啓",
    status: "処理待ち",
    uploadedAt: "2026-04-16",
    progress: 25,
    workflowType: "人物検出",
    matchState: { roster: "未確認", tag: "未確認", face: "未確認" }
  }
];

export const uploadFiles: UploadFile[] = [
  { id: "u1", fileName: "2026_6-1_student_portraits.zip", size: "2.3GB", type: "写真", status: "確認済み" },
  { id: "u2", fileName: "2026_6-1_roster.xlsx", size: "240KB", type: "名簿", status: "確認済み" },
  { id: "u3", fileName: "2026_teacher_master.pdf", size: "1.1MB", type: "PDF", status: "待機" }
];

export const personDetectionSourceFiles = [
  "grade6_group_01.pdf",
  "grade6_group_02.pdf",
  "sports_day_group.pdf"
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
      { id: "s3", label: "本番C", thumb: `${shotBase}1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80`, tags: ["重複候補"] }
    ],
    recommendedShotId: "s1"
  },
  {
    studentId: "CL-101",
    name: "サッカー部 集合",
    kind: "クラブ",
    className: "サッカー部",
    attendanceNo: null,
    placardShot: { id: "p4", label: "クラブ札", thumb: `${shotBase}1517466787929-bc90951d0974?auto=format&fit=crop&w=300&q=80`, tags: [] },
    mainShots: [
      { id: "c1", label: "候補A", thumb: `${shotBase}1521412644187-c49fa049e84d?auto=format&fit=crop&w=300&q=80`, tags: ["推奨"] },
      { id: "c2", label: "候補B", thumb: `${shotBase}1508098682722-e99c43a406b2?auto=format&fit=crop&w=300&q=80`, tags: ["ブレ"] },
      { id: "c3", label: "候補C", thumb: `${shotBase}1518600506278-4e8ef466b810?auto=format&fit=crop&w=300&q=80`, tags: ["NG候補"] }
    ],
    recommendedShotId: "c1"
  }
];

export const teacherMatchRecords: TeacherMatchRecord[] = [
  {
    id: "TM-001",
    photo: `${shotBase}1487412720507-e7ab37603c6f?auto=format&fit=crop&w=320&q=80`,
    detectedCardText: "タカハシ マリ",
    matchedTeacherName: "高橋 真理",
    matchedSubject: "国語",
    confidence: 0.94,
    status: "確定"
  },
  {
    id: "TM-002",
    photo: `${shotBase}1595152772835-219674b2a8a6?auto=format&fit=crop&w=320&q=80`,
    detectedCardText: "イノウエ ミサキ",
    matchedTeacherName: "井上 美咲",
    matchedSubject: "数学",
    confidence: 0.81,
    status: "要確認"
  }
];

export const layoutStudents: LayoutStudent[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `L-${i + 1}`,
  name: `6-1 生徒${i + 1}`,
  seat: `${Math.floor(i / 5) + 1}-${(i % 5) + 1}`,
  thumb: `${shotBase}1521119989659-a83eee488004?auto=format&fit=crop&w=200&q=80`
}));

export const metadataRecords: MetadataRecord[] = [
  { id: "ST-6101", name: "山田 花", className: "6年1組", shotDate: "2026-04-14", location: "第2撮影室", tags: ["卒業アルバム", "笑顔"], result: "推奨", thumb: `${shotBase}1542206395-9feb3edaa68d?auto=format&fit=crop&w=250&q=80` },
  { id: "CL-101", name: "サッカー部 集合", className: "サッカー部", shotDate: "2026-04-15", location: "校庭", tags: ["クラブ写真", "要再確認"], result: "要確認", thumb: `${shotBase}1521412644187-c49fa049e84d?auto=format&fit=crop&w=250&q=80` },
  { id: "TE-1201", name: "高橋 真理", className: "教職員", shotDate: "2026-04-14", location: "会議室A", tags: ["先生写真", "教員照合"], result: "推奨", thumb: `${shotBase}1487412720507-e7ab37603c6f?auto=format&fit=crop&w=250&q=80` }
];

export const qualityIssues: QualityIssue[] = [
  { id: "Q-1", type: "重複候補", leftThumb: `${shotBase}1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80`, rightThumb: `${shotBase}1463453091185-61582044d556?auto=format&fit=crop&w=250&q=80`, student: "鈴木 陽斗", className: "6年1組" },
  { id: "Q-2", type: "目つむり", leftThumb: `${shotBase}1519345182560-3f2917c472ef?auto=format&fit=crop&w=250&q=80`, rightThumb: `${shotBase}1499952127939-9bbf5af6c51c?auto=format&fit=crop&w=250&q=80`, student: "山田 花", className: "6年1組" },
  { id: "Q-3", type: "NG候補", leftThumb: `${shotBase}1524504388940-b1c1722653e1?auto=format&fit=crop&w=250&q=80`, rightThumb: `${shotBase}1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80`, student: "サッカー部 集合", className: "サッカー部" }
];

export const defaultDetectionSummary: DetectionSummary = {
  files: ["grade6_group_01.pdf", "grade6_group_02.pdf"],
  detectionMode: "人物抽出",
  outputFormat: "Excel出力",
  detectedCount: 138,
  outputFileName: "person_detection_result_2026_04_16.xlsx"
};
