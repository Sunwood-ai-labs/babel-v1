
# XXX 以下のsampleは変数として変える予定
from sample.def_concept import concept, dir_frontend

# プロジェクトBabelのルートディレクトリ作成
root_dir = "../src/components/generated/sample6/"

# プロジェクトBabelの詳細なディレクトリ構造の作成
directories = [
    "components",
    "styles",
    "utils",
    "hooks",
    "context",
    "public/images",
    "public/fonts"
]

# プロジェクトBabelのファイル構造
def_domain = concept + dir_frontend

# 作成するファイルの定義
files = [
    ('frontend', 'App.js', 
     def_domain + """App.jsファイルにReactコンポーネントを記載してください。
     左側にコンポーネントのメニューバーを配置スクロールバーを設置
     中央にコンポーネントのカードを表示するレイアウトを作成
     ヘッダーとフッターも含めてください。
     また、DynamicComponentを使用して、選択されたコンポーネントを動的に読み込むようにしてください。
     サイドバーと中央のコンテンツエリアでデザインを分けて、和風モダンなスタイルを適用してください。
     以下の様にDynamicComponentを使用してコンポーネントを動的に読み込みます。
     表示は日本語です。

        const sidebarComponents = {
            'AIマネジメント': [
            { name: 'AILearningStatus', displayName: 'AI学習状況', icon: <Zap size={18} /> },
            { name: 'CloudInfrastructure', displayName: 'クラウドインフラ', icon: <Settings size={18} /> },
            { name: 'ProgressStatus', displayName: '進捗状況', icon: <BarChart2 size={18} /> }

    """
    ),
    ('frontend', 'DynamicComponent.js',
     def_domain + """
     DynamicComponent.jsファイルに動的コンポーネントのロジックを記載してください。以下は例です。
import React from 'react';

const DynamicComponent = ({ componentName }) => {
  // コンポーネントの動的インポート
  let Component;

  switch (componentName) {
    // 在庫管理
    case 'StockManagement':
      Component = React.lazy(() => import('./components/Inventory/StockManagement'));
      break;
    case 'IngredientTracking':
      Component = React.lazy(() => import('./components/Inventory/IngredientTracking'));
      break;
    case 'SeasonalPlanning':
      Component = React.lazy(() => import('./components/Inventory/SeasonalPlanning'));
      break;

    // 製造

    ...


        default:
      Component = () => <div>コンポーネントが見つかりません</div>;
  }

  return (
    <React.Suspense fallback={<div>読み込み中...</div>}>
      <Component />
    </React.Suspense>
  );
};

export default DynamicComponent

     """
    ),
    ('frontend/components', 'GlobalChat.js',
     def_domain + """GlobalChat.jsファイルにSlackクローンのチャットコンポーネントを記載してください。
     以下の機能を実装し、コンポーネントがスクロールせずに画面に収まるようにしてください：
     - チャンネルリストの表示（左サイドバー）
     - メッセージリストの表示（中央エリア）
     - メッセージ入力フォーム（下部）
     - ユーザー情報とステータス表示（上部）
     - チャンネル検索機能
     - メッセージへの絵文字リアクション
     - スレッド返信機能
     - ファイル添付機能（アイコンのみ）
     レイアウトは固定高さを使用し、オーバーフローする部分のみスクロール可能にしてください。
     """
    ),
    ('frontend/components', 'MultilingualWiki.js',
     def_domain + """MultilingualWiki.jsファイルにNotionライクな多言語Wikiコンポーネントを記載してください。以下の機能を実装してください：

     1. ページ構造：
        - 階層構造のページ管理
        - ドラッグ＆ドロップでのページ並べ替え
        - サイドバーでのページツリー表示

     2. コンテンツ編集：
        - ブロックベースの編集システム（テキスト、画像、表、コード、埋め込み等）
        - インラインでのWYSIWYG編集
        - マークダウン記法のサポート
        - スラッシュコマンドによる素早いブロック挿入

     3. 多言語サポート：
        - ページごとの言語設定
        - リアルタイム多言語翻訳機能
        - 言語切り替えインターフェース

     4. コラボレーション機能：
        - リアルタイム共同編集
        - コメント機能
        - 変更履歴とバージョン管理

     5. 検索と整理：
        - フルテキスト検索機能
        - タグ付けとフィルタリング
        - データベース機能（テーブルビュー、ボードビュー等）

     6. インテグレーション：
        - 外部サービスとの連携（Slack、GitHub等）
        - APIサポート

     7. カスタマイズとテーマ：
        - ダークモード対応
        - カスタムテーマ設定

     8. セキュリティ：
        - ページごとのアクセス権限設定
        - 暗号化機能

     レスポンシブデザインを採用し、モバイルデバイスでも使いやすいインターフェースを実装してください。
     """
    ),
    ('frontend/components', 'ProjectDashboard.js',
     def_domain + """ProjectDashboard.jsファイルにプロジェクト管理ダッシュボードコンポーネントを記載してください。以下の機能を実装してください：

     1. プロジェクト概要：
        - プロジェクト名、説明、進捗状況の表示
        - 重要な指標（KPI）のグラフィカルな表示
        - プロジェクトのステータス（進行中、完了、遅延など）の視覚的表現

     2. タスク管理：
        - タスクの一覧表示（優先度、担当者、期限付き）
        - タスクの追加、編集、削除機能
        - ドラッグ＆ドロップでのタスクステータス変更
        - フィルタリングとソート機能

     3. 簡易ガントチャート：
        - プロジェクトのタイムラインの視覚化
        - タスクの開始日と終了日の表示
        - マイルストーンの表示
        - ズームイン/アウト機能

     4. チームメンバーのタイムゾーン表示：
        - チームメンバーの一覧と現在の現地時間
        - タイムゾーンごとのグルーピング
        - オンライン/オフラインステータスの表示

     5. 関連するチャットとWikiへのクイックアクセス：
        - プロジェクト関連のチャットルームへのリンク
        - 重要なWikiページへのショートカット
        - 最近の更新や未読メッセージの通知

     6. リソース管理：
        - チームメンバーのスキルと稼働状況の表示
        - リソースの割り当てと負荷のバランス表示

     7. レポートと分析：
        - プロジェクトの進捗レポート生成機能
        - タスク完了率、遅延率などの分析グラフ

     8. 通知とリマインダー：
        - 重要なイベントや締め切りの通知機能
        - カスタマイズ可能なリマインダー設定

     9. コラボレーション機能：
        - コメント機能
        - ファイル共有機能
        - タスクの依存関係の視覚化

     10. モバイル対応：
        - レスポンシブデザインによるモバイルフレンドリーな表示
        - タッチ操作に最適化されたインターフェース

     デザインは和風モダンなテイストを取り入れ、Tailwind CSSを使用して実装してください。
     ユーザビリティを重視し、直感的な操作が可能なインターフェースを目指してください。
     """
    ),
    ('frontend', 'styles.css',
     def_domain + """styles.cssファイルにグローバルスタイルを記載してください。
     Tailwind CSSを使用し、レスポンシブデザイン、ダークモード対応、
     カスタムカラーパレット、文化に応じて変更可能なデザイン変数を定義してください。
     """
    ),
]