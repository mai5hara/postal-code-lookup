# 住所検索

郵便番号から住所を検索する Web アプリケーションです。検索結果は検索履歴としてカルーセルで表示します。

## 動作環境

- Node.js 24 以上（`.nvmrc` でバージョンを指定しています）
- pnpm 9 以上

## セットアップ

```sh
# Node.js のバージョンを合わせる（nvm を使っている場合）
nvm use

# pnpm がない場合はインストールしてください
npm install -g pnpm

pnpm install
pnpm dev
```

http://localhost:5173 で確認できます。同一ネットワーク内の実機（iOS / Android）からは、起動時に表示される `Network` の URL でアクセスできます。

## スクリプト

| コマンド            | 内容                        |
| ------------------- | --------------------------- |
| `pnpm dev`          | 開発サーバーの起動          |
| `pnpm build`        | 型チェック + 本番ビルド     |
| `pnpm preview`      | ビルド成果物のプレビュー    |
| `pnpm typecheck`    | 型チェック                  |
| `pnpm lint`         | ESLint によるチェック       |
| `pnpm lint:fix`     | ESLint による自動修正       |
| `pnpm format`       | Prettier による整形         |
| `pnpm format:check` | Prettier による整形チェック |
| `pnpm test`         | テスト（watch モード）      |
| `pnpm test:run`     | テスト（1 回実行）          |

## 技術スタック

| 種別                 | 採用                                                              |
| -------------------- | ----------------------------------------------------------------- |
| 言語                 | TypeScript                                                        |
| フレームワーク       | React 19 + Vite                                                   |
| スタイル             | Sass (SCSS) / CSS Modules                                         |
| カルーセル           | Swiper                                                            |
| リンター             | ESLint（typescript-eslint, @eslint-react, react-hooks, jsx-a11y） |
| フォーマッター       | Prettier                                                          |
| テスト               | Vitest + React Testing Library (jsdom)                            |
| パッケージマネージャ | pnpm                                                              |
| API                  | [zipcloud](https://zipcloud.ibsnet.co.jp/doc/api)                 |

## ディレクトリ構成

```
src/
├── api/          # 郵便番号検索 API の呼び出しとレスポンスの変換
├── components/   # UI コンポーネント（コンポーネントごとに tsx / scss / test を同じディレクトリに置く）
├── hooks/        # 検索の状態と処理をまとめたカスタムフック
├── styles/       # グローバルスタイル、SCSS の変数・mixin・関数
├── test/         # テストのセットアップ
├── types/        # 型定義
└── utils/        # バリデーションなど、React に依存しない関数
```

## 補足

- 入力欄 1 つ・API 1 本の規模のため、バリデーションには zod を使わず純粋な関数で、データ取得には TanStack Query を使わず `useState` で実装しています。
- 検索履歴はメモリ上で保持しているため、ページを再読み込みするとリセットされます。
