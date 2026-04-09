export type NavItem = { href: string; label: string; subtitle?: string };

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
  type: "写真" | "名簿" | "先生データ";
  status: "待機" | "確認済み" | "エラー";
};

export type ShotTag = "推奨" | "目つむり" | "ブレ" | "NG候補" | "重複候補";

export type Shot = {
  id: string;
  label: string;
  thumb: string;
  tags: ShotTag[];
};

export type PersonKind = "生徒" | "教員";

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
