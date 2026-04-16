export type NavItem = { href: string; label: string; subtitle?: string };

export type ProcessingType = "individual" | "club" | "teacher_matching" | "person_detection";

export type SummaryMetric = {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "neutral";
};

export type ProjectStatus = "処理待ち" | "AI処理中" | "レビュー待ち" | "完了";

export type Project = {
  id: string;
  school: string;
  className: string;
  year: number;
  photographer: string;
  status: ProjectStatus;
  uploadedAt: string;
  progress: number;
  workflowType: "個人写真" | "クラブ写真" | "教員照合" | "人物検出";
  matchState: {
    roster: "未確認" | "完了";
    tag: "未確認" | "完了";
    face: "未確認" | "完了";
  };
};

export type UploadFile = {
  id: string;
  fileName: string;
  size: string;
  type: "写真" | "名簿" | "先生データ" | "PDF";
  status: "待機" | "確認済み" | "エラー";
};

export type ShotTag = "推奨" | "目つむり" | "ブレ" | "NG候補" | "重複候補";

export type Shot = {
  id: string;
  label: string;
  thumb: string;
  tags: ShotTag[];
};

export type PersonKind = "生徒" | "教員" | "クラブ";

export type StudentReview = {
  studentId: string;
  name: string;
  kind: PersonKind;
  className: string;
  attendanceNo: number | null;
  placardShot: Shot;
  mainShots: Shot[];
  recommendedShotId: string;
};

export type TeacherMatchRecord = {
  id: string;
  photo: string;
  detectedCardText: string;
  matchedTeacherName: string;
  matchedSubject: string;
  confidence: number;
  status: "要確認" | "確定";
};

export type DetectionSummary = {
  files: string[];
  detectionMode: "人物抽出" | "集合写真解析";
  outputFormat: "Excel出力" | "一覧出力";
  detectedCount: number;
  outputFileName: string;
};

export type LayoutStudent = {
  id: string;
  name: string;
  seat: string;
  thumb: string;
};

export type MetadataRecord = {
  id: string;
  name: string;
  className: string;
  shotDate: string;
  location: string;
  tags: string[];
  result: "推奨" | "要確認" | "差し替え候補";
  thumb: string;
};

export type QualityIssue = {
  id: string;
  type: "重複候補" | "ピンボケ" | "目つむり" | "NG候補" | "顔が小さい" | "露出不安定";
  leftThumb: string;
  rightThumb: string;
  student: string;
  className: string;
};
