# プロジェクト バベル

![bigban_optimized_final](https://github.com/user-attachments/assets/b0d0e8aa-4702-45ac-9ee7-5e5a74a0a397)

**注意** プロジェクト バベルは実験的なプロジェクトです。
まだ正式なリリースではないのでご了承下さい。

### フロントエンドの立ち上げ

こちらのURLにアクセスしてください。
→ https://babelv1.vercel.app/development/editor

### バックエンドの立ち上げ

バックエンドは FastAPI と webソケットを利用しています。

1. `src/backend` ディレクトリに移動します：

```bash
git clone https://github.com/dai-motoki/babel-v1-backend.git
cd babel-v1-backend
```

2. バックエンドサーバーを起動します：


事前に 

以下AnthropicのAPIキーを設定してください。
https://console.anthropic.com/settings/keys

```sh
export ANTHROPIC_API_KEY=sk-ant-xxxxx

```


以下２つは別のターミナルで立ち上げてください。
```bash
uvicorn file_watcher:app --host 0.0.0.0 --port 8001 --reload
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

4. バックエンドサーバーが `http://localhost:8000`, `http://localhost:8001` で起動します。


注意：実際の環境設定や依存関係は、プロジェクトの具体的な構成によって異なる場合があります。必要に応じて、プロジェクトのREADMEファイルや設定ファイルを確認してください。
