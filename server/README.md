# Whiteboard Server

リアルタイムホワイトボードアプリケーションのサーバー側です。

## 機能

- リアルタイム描画の同期
- ルーム機能
- 描画履歴の保存
- キャンバスの全消去

## 技術スタック

- Node.js
- Express
- Socket.io
- CORS

## ローカル開発

```bash
npm install
npm run dev
```

## Herokuへのデプロイ

1. Herokuアカウントを作成
2. Heroku CLIをインストール
3. 以下のコマンドを実行：

```bash
heroku create your-app-name
heroku config:set CLIENT_URL=https://your-client-url.vercel.app
git push heroku main
```

## 環境変数

- `PORT`: サーバーポート（Herokuが自動設定）
- `CLIENT_URL`: クライアントのURL（CORS設定用）