import React, { useState, useEffect } from 'react';
import { Search, Package, Download, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    // ダミーデータを使用したAPI呼び出しのシミュレーション
    const fetchPackages = async () => {
      const dummyData = [
        { id: 1, name: 'AI画像生成パッケージ', category: 'AI', downloads: 1500, stars: 4.5 },
        { id: 2, name: 'データ分析ツールキット', category: '分析', downloads: 2300, stars: 4.2 },
        { id: 3, name: 'セキュリティ監査システム', category: 'セキュリティ', downloads: 1800, stars: 4.7 },
        { id: 4, name: 'クラウドストレージマネージャー', category: 'クラウド', downloads: 3000, stars: 4.0 },
        { id: 5, name: 'ブロックチェーン開発キット', category: 'ブロックチェーン', downloads: 1200, stars: 4.3 },
      ];
      setPackages(dummyData);
    };

    fetchPackages();
  }, []);

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('packageList.title')}</h2>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder={t('packageList.searchPlaceholder')}
          className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>
      <div className="space-y-4">
        {filteredPackages.map(pkg => (
          <div key={pkg.id} className="border border-gray-200 p-4 rounded-md hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-indigo-600">{pkg.name}</h3>
                <p className="text-sm text-gray-600">{t('packageList.category')}: {pkg.category}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Download size={16} className="mr-1" />
                  {pkg.downloads}
                </div>
                <div className="flex items-center text-sm text-yellow-500">
                  <Star size={16} className="mr-1" />
                  {pkg.stars}
                </div>
              </div>
            </div>
            <button className="mt-3 flex items-center justify-center w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">
              <Package size={16} className="mr-2" />
              {t('packageList.installButton')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageList;