# オンライン ホワイトボード アプリ

リアルタイムで複数のユーザーが同時に描画できるホワイトボードアプリケーションです。

## 機能

- リアルタイム描画共有
- ペンツールと消しゴムツール
- 色と太さのカスタマイズ
- ルーム機能（複数のホワイトボードを同時運用）
- 全消去機能
- 描画履歴の保存・復元

## 技術スタック

### サーバー側
- Node.js
- Express
- Socket.io
- CORS

### クライアント側
- React
- TypeScript
- Socket.io Client
- HTML5 Canvas

## プロジェクト構成

```
white/
├── server/          # バックエンドサーバー
│   ├── server.js    # メインサーバーファイル
│   ├── package.json
│   └── Procfile     # Heroku用設定
├── client/          # フロントエンドクライアント
│   ├── src/
│   │   ├── components/
│   │   │   ├── Whiteboard.tsx
│   │   │   └── Whiteboard.css
│   │   ├── App.tsx
│   │   └── App.css
│   ├── package.json
│   └── vercel.json  # Vercel用設定
└── README.md
```

## ローカル開発

### 1. サーバーの起動

```bash
cd server
npm install
npm run dev
```

### 2. クライアントの起動

```bash
cd client
npm install
npm start
```

ブラウザで `http://localhost:3000` にアクセスしてください。

## デプロイ

### Heroku（サーバー）

1. Herokuアカウントを作成
2. Heroku CLIをインストール
3. サーバーディレクトリで以下を実行：

```bash
cd server
heroku create your-server-name
heroku config:set CLIENT_URL=https://your-client-url.vercel.app
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### Vercel（クライアント）

1. Vercelアカウントを作成
2. GitHubにリポジトリをプッシュ
3. Vercelで新しいプロジェクトを作成
4. 環境変数を設定：
   - `REACT_APP_SERVER_URL`: HerokuのサーバーURL
5. デプロイ

## 使用方法

1. 複数のユーザーが同じルームIDを入力
2. ペンまたは消しゴムを選択
3. 色と太さを調整
4. キャンバス上で描画
5. 他のユーザーの描画がリアルタイムで表示される

## 環境変数

### サーバー側
- `PORT`: サーバーポート（Herokuが自動設定）
- `CLIENT_URL`: クライアントのURL（CORS設定用）

### クライアント側
- `REACT_APP_SERVER_URL`: サーバーのURL（Socket.io接続用）

## ライセンス

MIT License