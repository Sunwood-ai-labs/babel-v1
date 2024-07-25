
# XXX 以下のsampleは変数として変える予定
from sample.def_concept import concept, dir_frontend

# プロジェクトBabelのバックエンドルートディレクトリ作成
root_dir = "../src/components/generated/sample_backend/"
# プロジェクトBabelのバックエンド詳細なディレクトリ構造の作成
directories = [
    "api",
    "models",
    "services",
    "utils",
    "config",
    "tests",
    "migrations",
    "scripts"
]

# プロジェクトBabelのバックエンドファイル構造
def_domain = concept + dir_frontend

# 作成するバックエンドファイルの定義
files = [
    ('frontend', 'App.js', 
     """app.jsファイルに単純なHTMLページを表示するコードを記載してください。
     依存関係や外部APIは使用せず、基本的なHTMLとCSSのみで構成してください。
     DynamicComponentも使わない
     importをかかない！！
     """
    ),
    ('backend', 'app.py', 
     def_domain + """app.pyファイルにFastAPIアプリケーションのメインエントリーポイントを記載してください。
     CORSミドルウェア、ルーティング、データベース接続の設定を含めてください。
     """
    ),
    ('backend/api', 'chat.py',
     def_domain + """chat.pyファイルにグローバルチャット機能のAPIエンドポイントを実装してください。
     WebSocketを使用したリアルタイムメッセージング、チャンネル管理、メッセージ履歴の取得などの機能を含めてください。
     """
    ),
    ('backend/api', 'wiki.py',
     def_domain + """wiki.pyファイルに多言語WikiのAPIエンドポイントを実装してください。
     ページの作成、編集、削除、バージョン管理、多言語翻訳機能などを含めてください。
     """
    ),
    ('backend/api', 'project.py',
     def_domain + """project.pyファイルにプロジェクト管理のAPIエンドポイントを実装してください。
     プロジェクトの作成、更新、タスク管理、チーム管理、進捗報告などの機能を含めてください。
     """
    ),
    ('backend/models', 'user.py',
     def_domain + """user.pyファイルにユーザーモデルを定義してください。
     ユーザー認証、プロフィール情報、権限管理などの属性を含めてください。
     """
    ),
    ('backend/models', 'chat.py',
     def_domain + """chat.pyファイルにチャットに関連するモデル（メッセージ、チャンネルなど）を定義してください。
     """
    ),
    ('backend/models', 'wiki.py',
     def_domain + """wiki.pyファイルにWikiに関連するモデル（ページ、リビジョン、コメントなど）を定義してください。
     """
    ),
    ('backend/models', 'project.py',
     def_domain + """project.pyファイルにプロジェクト管理に関連するモデル（プロジェクト、タスク、マイルストーンなど）を定義してください。
     """
    ),
    ('backend/services', 'translation.py',
     def_domain + """translation.pyファイルに多言語翻訳サービスを実装してください。
     外部APIとの連携や、キャッシュ機能を含めてください。
     """
    ),
    ('backend/utils', 'auth.py',
     def_domain + """auth.pyファイル認証・認可に関するユーティリティ関数を実装してください。
     JWTトークンの生成、検証、権限チェックなどの機能を含めてください。
     """
    )
]