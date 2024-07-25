import React, { lazy, Suspense } from 'react';

const DynamicComponent = ({ componentName }) => {
  const componentMap = {
    // SaaS・パッケージマネージャー
    SaaSList: lazy(() => import('./components/SaaSPackageManager/SaaSList')),
    PackageList: lazy(() => import('./components/SaaSPackageManager/PackageList')),
    ItemCard: lazy(() => import('./components/SaaSPackageManager/ItemCard')),

    // 統合開発環境（IDE）
    MonacoEditor: lazy(() => import('./components/IDE/MonacoEditor')),
    FileExplorer: lazy(() => import('./components/IDE/FileExplorer')),
    OutputConsole: lazy(() => import('./components/IDE/OutputConsole')),

    // コラボレーションハブ
    ChatInterface: lazy(() => import('./components/CollaborationHub/ChatInterface')),
    MarkdownEditor: lazy(() => import('./components/CollaborationHub/MarkdownEditor')),
    FileSharing: lazy(() => import('./components/CollaborationHub/FileSharing')),

    // プロジェクトダッシュボード
    VersionControl: lazy(() => import('./components/ProjectDashboard/VersionControl')),
    TaskBoard: lazy(() => import('./components/ProjectDashboard/TaskBoard')),
    PriorityVoting: lazy(() => import('./components/ProjectDashboard/PriorityVoting')),
    ProgressChart: lazy(() => import('./components/ProjectDashboard/ProgressChart')),

    // 共通コンポーネント
    Sidebar: lazy(() => import('./components/Common/Sidebar')),
    Header: lazy(() => import('./components/Common/Header')),
    Modal: lazy(() => import('./components/Common/Modal')),
    LanguageSwitcher: lazy(() => import('./components/Common/LanguageSwitcher')),

    // 国際化コンポーネント
    TranslationProvider: lazy(() => import('./components/I18n/TranslationProvider')),
    LanguageDetector: lazy(() => import('./components/I18n/LanguageDetector')),
  };

  const Component = componentMap[componentName] || (() => <div className="text-red-500">コンポーネントが見つかりません</div>);

  return (
    <Suspense fallback={<div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>}>
      <Component />
    </Suspense>
  );
};

export default DynamicComponent;