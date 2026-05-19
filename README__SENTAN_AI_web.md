# 先端AIロボテック株式会社 — 公式サイト

## 構成概要

| 項目 | 内容 |
|------|------|
| 本番URL | https://www.airobo-tech.com |
| ホスティング | Cloudflare Pages（無料・商用OK） |
| ソースコード | GitHub `yumimatsuda-star/sentan-website` |
| ローカル作業 | `~/website/` |
| コード編集 | Cursor |
| ドメイン管理 | Cloudflare（airobo-tech.com） |

---

## ファイル構成

```
website/
├── index.html           # トップページ
├── services.html        # 事業内容
├── cases.html           # 導入事例
├── company.html         # 会社情報
├── technology.html      # 技術・テクノロジー
├── contact.html         # お問い合わせ
├── recruit.html         # 採用情報
├── privacy.html         # プライバシーポリシー
├── terms.html           # 利用規約
├── subsidy-2026.html    # 【特設】令和8年度 利益率向上・賃上げ支援事業（大阪府）
├── site.css             # 共通スタイル
├── tokens.css           # デザイントークン（色・フォント等）
├── components.jsx       # 共通コンポーネント（React CDN版）
└── assets/              # 画像・アイコン等
```

---

## デプロイの仕組み

```
ローカル編集（Cursor）
　　↓ git push
GitHub（yumimatsuda-star/sentan-website）
　　↓ 自動デプロイ（Cloudflare Pagesが自動検知）
Cloudflare Pages
　　↓
https://www.airobo-tech.com で公開
```

GitHubのmainブランチにpushすると、**Cloudflare Pagesが自動でビルド・デプロイ**します。特別な操作は不要です。

---

## サイト更新手順

### 1. Cursorでコードを編集する

`~/website/` 内のファイルをCursorで編集します。

### 2. ターミナルでpushする

```bash
cd ~/website
git add .
git commit -m "更新内容をわかりやすく記載"
git push
```

### 3. 自動デプロイを確認する

Cloudflareのダッシュボードでデプロイ状況を確認できます。
- [Cloudflare Workers & Pages](https://dash.cloudflare.com/) にログイン
- `Workers & Pages` → `sentan-website` → `デプロイ` タブ

通常1〜2分で本番に反映されます。

---

## お知らせ・特設ページの運用（ブログ的機能）

トップページのヒーロー直下に **NEWバナー** を設置しています。新しいお知らせや特設ページを追加する際の手順は以下のとおりです。

### 新しいお知らせを追加する場合

1. `index.html` 内の `NewsBar` コンポーネントのテキストとリンク先を更新する
2. 特設ページ（例：`subsidy-2026.html`）を新規作成する
3. pushしてデプロイ

### 特設ページの作成ルール

- ファイル名は内容がわかる英数字で（例：`subsidy-2026.html`）
- `index.html` のhead・グローバルスタイル・Nav・Footerをベースにコピーして作成
- OGPタグのURLは `https://airobo-tech.com/ページ名.html` にする
- **Reactのstateの重複宣言に注意**：`const { useState, useEffect, useRef } = React;` はscript内で1回だけ宣言する

### 現在の特設ページ一覧

| ページ | URL | 概要 |
|--------|-----|------|
| 令和8年度 利益率向上・賃上げ支援事業 | `/subsidy-2026.html` | 大阪府補助金情報。上限500万・補助率2/3。申請期限2026/6/26 |

---

## 各サービスの管理画面

| サービス | URL | 用途 |
|----------|-----|------|
| Cloudflare | https://dash.cloudflare.com | DNS・Pages管理 |
| GitHub | https://github.com/yumimatsuda-star/sentan-website | ソースコード管理 |
| Vercel | https://vercel.com | ※現在は未使用（放置でOK） |

---

## DNS構成（Cloudflare）

| タイプ | 名前 | コンテンツ | 用途 |
|--------|------|-----------|------|
| CNAME | @ | airobo-tech.com → www へリダイレクト | ルートドメイン |
| CNAME | www | sentan-website.pages.dev | Cloudflare Pages |

---

## メタタグのURL

全HTMLファイルのOGP・Twitterカードのメタタグは `https://www.airobo-tech.com` を使用しています。
新しいページを追加する場合は以下の形式でメタタグを記載してください。

```html
<meta property="og:url" content="https://www.airobo-tech.com/ページ名.html" />
<meta property="og:image" content="https://www.airobo-tech.com/assets/ogp.png" />
<meta name="twitter:image" content="https://www.airobo-tech.com/assets/ogp.png" />
```

---

## 注意事項

- **ローカル作業ディレクトリ**：`~/website/`（以前の `~/Downloads/website/project/` から移動済み）
- **Vercel**：現在未使用です。Vercelの管理画面でドメインがエラー表示になっていますが、本番サイトへの影響はありません。不要であれば削除してもOKです。
- **商用利用**：Cloudflare Pagesは商用利用可・無料です。
- **ブランチ**：本番デプロイはmainブランチのみ。開発時は別ブランチを使うことを推奨します。
- **Reactの重複宣言エラー**：新しいページを追加する際、NavやFooterをコピーすると `useState` 等が重複して真っ黒画面になることがあります。script内の `const { useState, ... } = React;` が1箇所だけになっているか確認してください。
