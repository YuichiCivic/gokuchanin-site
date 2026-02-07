# 極茶人 | 茶工房 比留間園 公式サイト

農林水産大臣賞7回受賞の茶師・比留間嘉章（極茶人）が営む茶工房比留間園の公式サイトです。

## 開発

```bash
npm install
npm run dev
```

http://localhost:3000 で確認できます。

## デプロイ

### Cloudflare Pages（推奨）

1. このリポジトリをGitHubにpush
2. Cloudflareダッシュボード → Workers & Pages → Create
3. Connect to Git → このリポジトリを選択
4. ビルド設定：
   - Framework preset: `Next.js (Static HTML Export)`
   - Build command: `npx next build`
   - Build output directory: `out`
5. Deploy

### Vercel

1. [vercel.com](https://vercel.com) でImport Project
2. このリポジトリを選択 → Deploy

## 構成

- **Framework**: Next.js 15 (Static Export)
- **スタイル**: CSS-in-JS (インラインスタイル)
- **フォント**: Zen Old Mincho + Noto Serif JP
- **ルーティング**: ハッシュベース（SPA）

## ページ一覧

| ページ | 内容 |
|---|---|
| ホーム | メインビジュアル・各セクション概要 |
| 茶人紹介 | 比留間嘉章氏の経歴・資格 |
| 手もみ茶 | 極上手もみ茶の世界 |
| 微発酵煎茶 | UVT-HIRUMAシステム |
| 半発酵茶 | 国産半発酵茶への挑戦 |
| 栽培品種 | 6品種の解説 |
| 淹れ方 | 4スタイル・全商品リスト |
| 受賞歴 | 1981年〜の全記録 |
| 掲載雑誌 | メディア掲載情報 |
| ひとりごと | エッセイ |
| お問合せ | 連絡先・営業情報 |
