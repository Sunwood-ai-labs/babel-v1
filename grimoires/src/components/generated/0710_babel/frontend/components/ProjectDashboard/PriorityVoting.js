import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThumbsUp, ThumbsDown, BarChart2 } from 'lucide-react';

const PriorityVoting = () => {
  const { t } = useTranslation();
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ダミーデータを使用したAPI呼び出しの模擬
    const fetchFeatures = async () => {
      setLoading(true);
      // 実際のAPIコールの代わりに、タイムアウトを使用
      await new Promise(resolve => setTimeout(resolve, 1000));
      const dummyFeatures = [
        { id: 1, name: 'AIコード生成', votes: 15, description: 'AIを使用したコード自動生成機能' },
        { id: 2, name: 'リアルタイム協力', votes: 10, description: 'リアルタイムでのペアプログラミング機能' },
        { id: 3, name: '多言語翻訳', votes: 8, description: 'プロジェクト内の自動多言語翻訳' },
        { id: 4, name: 'セキュリティスキャン', votes: 12, description: '自動セキュリティ脆弱性スキャン' },
      ];
      setFeatures(dummyFeatures);
      setLoading(false);
    };

    fetchFeatures();
  }, []);

  const handleVote = (id, increment) => {
    setFeatures(prevFeatures =>
      prevFeatures.map(feature =>
        feature.id === id
          ? { ...feature, votes: feature.votes + (increment ? 1 : -1) }
          : feature
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto my-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-indigo-500 pb-2">
        {t('Feature Priority Voting')}
      </h2>
      <ul className="space-y-6">
        {features.map(feature => (
          <li key={feature.id} className="bg-gray-50 rounded-md p-4 shadow transition duration-300 ease-in-out hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium text-gray-900">{t(feature.name)}</h3>
                <p className="text-gray-600 mt-1">{t(feature.description)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleVote(feature.id, true)}
                  className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition duration-300"
                >
                  <ThumbsUp size={20} />
                </button>
                <span className="text-2xl font-semibold text-indigo-600">{feature.votes}</span>
                <button
                  onClick={() => handleVote(feature.id, false)}
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition duration-300"
                >
                  <ThumbsDown size={20} />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${(feature.votes / Math.max(...features.map(f => f.votes))) * 100}%` }}
                ></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <button className="flex items-center bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition duration-300">
          <BarChart2 className="mr-2" />
          {t('View Detailed Analytics')}
        </button>
      </div>
    </div>
  );
};

export default PriorityVoting;