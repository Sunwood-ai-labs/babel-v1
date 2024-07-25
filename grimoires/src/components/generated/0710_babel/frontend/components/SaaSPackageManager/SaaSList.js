import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plus, MoreHorizontal } from 'lucide-react';
import ItemCard from './ItemCard';

const SaaSList = () => {
  const { t } = useTranslation();
  const [saasItems, setSaasItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // ダミーデータを使用してAPIの呼び出しをシミュレート
    const fetchSaaSItems = async () => {
      const dummyData = [
        { id: 1, name: 'CRM System', category: 'Business', status: 'Active' },
        { id: 2, name: 'E-commerce Platform', category: 'Retail', status: 'Pending' },
        { id: 3, name: 'Project Management Tool', category: 'Productivity', status: 'Active' },
        { id: 4, name: 'Accounting Software', category: 'Finance', status: 'Inactive' },
      ];
      setSaasItems(dummyData);
    };

    fetchSaaSItems();
  }, []);

  const filteredItems = saasItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('saasListTitle')}</h1>
      <div className="mb-6 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300 flex items-center">
          <Plus size={20} className="mr-2" />
          {t('addNewSaaS')}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      {filteredItems.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          {t('noItemsFound')}
        </div>
      )}
      <div className="mt-8 flex justify-center">
        <button className="text-indigo-600 hover:text-indigo-800 transition duration-300 flex items-center">
          <MoreHorizontal size={20} className="mr-2" />
          {t('loadMore')}
        </button>
      </div>
    </div>
  );
};

export default SaaSList;