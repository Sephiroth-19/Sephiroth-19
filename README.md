# 恵雅堂（Keigado）学校写真管理システム UIデモ

> クライアントレビュー用のフロントエンドデモです。**実API / 実DB / 実AI処理は実装していません。**

## 1) ページ構成

- `/` ダッシュボード
  - 案件サマリー、業務フロー、直近案件一覧
- `/upload` 新規案件作成（アップロード）
  - 学校/年度/クラス入力、疑似アップロード、進捗シミュレーション
- `/review` 写真レビュー
  - 生徒ごとの複数カット比較、AIタグ表示、推奨写真の手動切替
- `/layout-review` レイアウト確認
  - 学級レイアウトプレビュー、サイズ/背景トーン調整、保存・再生成（モック）
- `/search` 検索・メタデータ編集
  - 氏名/ID検索、結果一覧、右ドロワー編集、保存トースト
- `/quality` 重複・品質チェック
  - 問題候補比較（重複/ピンボケ等）、保持/除外/要確認アクション

## 2) フォルダ構成

```text
app/
  layout.tsx
  globals.css
  page.tsx
  upload/page.tsx
  review/page.tsx
  layout-review/page.tsx
  search/page.tsx
  quality/page.tsx
components/
  main-shell.tsx
  ui.tsx
data/
  mock-data.ts
types/
  demo.ts
lib/
  helpers.ts
```

## 3) モック化している内容

- ファイルアップロード（ドラッグ&ドロップUIのみ）
- 処理開始後の進捗表示（タイマーによる疑似進行）
- AI判定タグ（推奨/目つむり/ブレ/NG候補/重複候補）
- レイアウト再生成/保存
- メタデータ保存
- 重複・品質判定の集計

## 4) ローカル実行方法

```bash
npm install
npm run dev
```

- ブラウザで `http://localhost:3000` を開いて確認してください。

## 技術スタック

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
