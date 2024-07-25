import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Package, Star, Download, Clock } from 'lucide-react';

const ItemCard = ({ id }) => {
  const { t } = useTranslation();
  const [item, setItem] = useState(null);

  useEffect(() => {
    // ダミーデータを使用したAPI呼び出しのシミュレーション
    const fetchItem = async () => {
      // 実際のAPIコールの代わりに、タイムアウトを使用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // ダミーデータ
      const dummyItem = {
        id,
        name: `SaaS Package ${id}`,
        description: `A powerful SaaS solution for modern businesses.`,
        rating: 4.5,
        downloads: 1000 + id * 100,
        lastUpdated: new Date().toISOString(),
        tags: ['AI', 'Analytics', 'Cloud'],
      };
      
      setItem(dummyItem);
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{t(item.name)}</h2>
          <Package className="text-indigo-600" size={24} />
        </div>
        <p className="text-gray-600 mb-4">{t(item.description)}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-1" size={20} />
            <span className="text-gray-700">{item.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <Download className="text-green-500 mr-1" size={20} />
            <span className="text-gray-700">{item.downloads.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="mr-1" size={16} />
          <span>{t('Last updated')}: {new Date(item.lastUpdated).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
              {t(tag)}
            </span>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          {t('View Details')}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;