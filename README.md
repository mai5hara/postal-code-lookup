# ENSAPIA Coding Test

## 技術スタック

| 種別                 | 採用                                              |
| -------------------- | ------------------------------------------------- |
| 言語                 | TypeScript                                        |
| フレームワーク       | React 19 + Vite                                   |
| スタイル             | Sass (SCSS) / CSS Modules                         |
| リンター             | ESLint (typescript-eslint, react-hooks, jsx-a11y) |
| フォーマッター       | Prettier                                          |
| テスト               | Vitest + React Testing Library (jsdom)            |
| パッケージマネージャ | pnpm                                              |

## 動作環境

- Node.js 24 以上
- pnpm 9 以上

## セットアップ

```sh
pnpm install
pnpm dev
```

http://localhost:5173 で確認できます。同一ネットワーク内の実機（iOS / Android）からは、起動時に表示される `Network` の URL でアクセスできます。

## スクリプト

| コマンド            | 内容                        |
| ------------------- | --------------------------- |
| `pnpm dev`          | 開発サーバ起動              |
| `pnpm build`        | 型チェック + 本番ビルド     |
| `pnpm preview`      | ビルド成果物のプレビュー    |
| `pnpm typecheck`    | 型チェック                  |
| `pnpm lint`         | ESLint によるチェック       |
| `pnpm lint:fix`     | ESLint による自動修正       |
| `pnpm format`       | Prettier による整形         |
| `pnpm format:check` | Prettier による整形チェック |
| `pnpm test`         | テスト（watch モード）      |
| `pnpm test:run`     | テスト（1 回実行）          |

## ディレクトリ構成

```
src/
├── components/   # UI コンポーネント（コンポーネント単位でディレクトリを切り、tsx / scss / test を同居）
├── styles/       # グローバルスタイル・SCSS 変数・mixin
└── test/         # テストのセットアップ
```
