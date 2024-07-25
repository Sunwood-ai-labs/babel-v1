import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plus, ChevronDown, ChevronRight, Edit2, Trash2 } from 'lucide-react';

const MarkdownEditor = () => {
  const { t } = useTranslation();
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // ダミーデータの読み込み
    const dummyPages = [
      { id: 1, title: 'ホームページ', content: '# ようこそ\nこれはホームページです。', children: [2, 3] },
      { id: 2, title: 'プロジェクト概要', content: '## プロジェクト概要\nこのプロジェクトは...', children: [] },
      { id: 3, title: 'チームメンバー', content: '## チームメンバー\n- 山田太郎\n- 佐藤花子', children: [] },
    ];
    setPages(dummyPages);
    setCurrentPage(dummyPages[0]);
  }, []);

  const handlePageSelect = (pageId) => {
    const selected = pages.find(page => page.id === pageId);
    setCurrentPage(selected);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderPageTree = (pageId, depth = 0) => {
    const page = pages.find(p => p.id === pageId);
    if (!page) return null;

    return (
      <div key={page.id} className={`ml-${depth * 4}`}>
        <div
          className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
          onClick={() => handlePageSelect(page.id)}
        >
          {page.children.length > 0 ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span className="ml-1">{page.title}</span>
        </div>
        {page.children.map(childId => renderPageTree(childId, depth + 1))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="w-64 border-r border-gray-200 p-4">
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t('検索')}
              className="w-full pl-8 pr-2 py-1 border border-gray-300 rounded"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        <button className="w-full bg-indigo-600 text-white py-2 rounded flex items-center justify-center mb-4">
          <Plus size={18} className="mr-2" />
          {t('新規ページ')}
        </button>
        <div className="overflow-y-auto h-full">
          {pages.map(page => renderPageTree(page.id))}
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        {currentPage && (
          <div>
            <h1 className="text-3xl font-bold mb-4">{currentPage.title}</h1>
            <div className="flex space-x-2 mb-4">
              <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center">
                <Edit2 size={16} className="mr-1" />
                {t('編集')}
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded flex items-center">
                <Trash2 size={16} className="mr-1" />
                {t('削除')}
              </button>
            </div>
            <div className="prose max-w-none">
              {currentPage.content.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;