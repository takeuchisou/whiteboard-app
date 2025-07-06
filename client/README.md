# Whiteboard Client

リアルタイムホワイトボードアプリケーションのクライアント側です。

## 機能

- リアルタイム描画
- ペンツールと消しゴムツール
- 色と太さの選択
- ルーム機能
- 全消去機能

## 技術スタック

- React
- TypeScript
- Socket.io Client
- HTML5 Canvas

## ローカル開発

```bash
npm install
npm start
```

## Vercelへのデプロイ

1. Vercelアカウントを作成
2. GitHub/GitLabにリポジトリをプッシュ
3. Vercelで新しいプロジェクトを作成
4. 環境変数を設定：
   - `REACT_APP_SERVER_URL`: サーバーのURL
5. デプロイ

## 環境変数

- `REACT_APP_SERVER_URL`: サーバーのURL（Socket.io接続用）

## 使用方法

1. ルームIDを設定（複数ユーザーで同じルームIDを使用）
2. ペンまたは消しゴムを選択
3. 色と太さを調整
4. キャンバス上で描画
5. 他のユーザーの描画がリアルタイムで表示される

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.