import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, Settings, BarChart2, Code, Users, Folder, Globe } from 'lucide-react';
import DynamicComponent from './DynamicComponent';

const App = () => {
  const { t } = useTranslation();
  const [selectedComponent, setSelectedComponent] = useState(null);

  const sidebarComponents = {
    'AIマネジメント': [
      { name: 'AILearningStatus', displayName: 'AI学習状況', icon: <Zap size={18} /> },
      { name: 'CloudInfrastructure', displayName: 'クラウドインフラ', icon: <Settings size={18} /> },
      { name: 'ProgressStatus', displayName: '進捗状況', icon: <BarChart2 size={18} /> }
    ],
    '開発ツール': [
      { name: 'IDE', displayName: '統合開発環境', icon: <Code size={18} /> },
      { name: 'CollaborationHub', displayName: 'コラボレーションハブ', icon: <Users size={18} /> },
      { name: 'ProjectDashboard', displayName: 'プロジェクトダッシュボード', icon: <Folder size={18} /> }
    ],
    '多言語サポート': [
      { name: 'LanguageSwitcher', displayName: '言語切替', icon: <Globe size={18} /> }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-indigo-600 text-white p-4">
        <h1 className="text-2xl font-semibold">システム生成Babel SaaSプラットフォーム</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* サイドバー */}
        <nav className="w-64 bg-white shadow-lg overflow-y-auto">
          {Object.entries(sidebarComponents).map(([category, items]) => (
            <div key={category} className="p-4">
              <h2 className="text-lg font-semibold mb-2">{category}</h2>
              <ul>
                {items.map((item) => (
                  <li key={item.name} className="mb-2">
                    <button
                      onClick={() => setSelectedComponent(item.name)}
                      className="flex items-center w-full text-left px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                    >
                      {item.icon}
                      <span className="ml-2">{item.displayName}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* メインコンテンツ */}
        <main className="flex-1 p-6 overflow-y-auto">
          {selectedComponent ? (
            <DynamicComponent componentName={selectedComponent} />
          ) : (
            <div className="text-center text-gray-500 mt-20">
              <p className="text-xl">左側のメニューからコンポーネントを選択してください</p>
            </div>
          )}
        </main>
      </div>

      {/* フッター */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2023 システム生成Babel SaaSプラットフォーム. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;