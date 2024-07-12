import React, { useState, useEffect } from 'react';
import { Search, Package, Download, Star, Music, Video, Image } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { t } = useTranslation();

  useEffect(() => {
    // ダミーデータを使用してAPIの動作をシミュレート
    const dummyPackages = [
      { id: 1, name: 'オーディオエディター', category: 'audio', stars: 120, downloads: 5000, icon: Music },
      { id: 2, name: 'ビデオエンコーダー', category: 'video', stars: 85, downloads: 3200, icon: Video },
      { id: 3, name: '画像処理ライブラリ', category: 'image', stars: 200, downloads: 8000, icon: Image },
      { id: 4, name: '音声認識ツール', category: 'audio', stars: 150, downloads: 6000, icon: Music },
      { id: 5, name: '動画編集スイート', category: 'video', stars: 95, downloads: 4000, icon: Video },
    ];
    setPackages(dummyPackages);
  }, []);

  const filteredPackages = packages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || pkg.category === selectedCategory)
  );

  const categories = ['all', 'audio', 'video', 'image'];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{t('マルチメディアリスト')}</h1>
      <div className="mb-6 relative">
        <img src="https://picsum.photos/800/200" alt="マルチメディアバナー" className="w-full h-48 object-cover rounded-lg mb-4" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 rounded-lg"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-bold mb-2">マルチメディアの魔法</h2>
          <p className="text-sm">音声、映像、画像を自在に操る力を手に入れよう</p>
        </div>
      </div>
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder={t('パッケージを検索')}
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>{t(category)}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map(pkg => {
          const IconComponent = pkg.icon;
          return (
            <div key={pkg.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="mb-4">
                <img src={`https://picsum.photos/300/200?random=${pkg.id}`} alt={pkg.name} className="w-full h-40 object-cover rounded-lg" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{pkg.name}</h2>
                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  {t(pkg.category)}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <Star className="mr-1" size={16} />
                  <span>{pkg.stars}</span>
                </div>
                <div className="flex items-center">
                  <Download className="mr-1" size={16} />
                  <span>{pkg.downloads}</span>
                </div>
              </div>
              <button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 flex items-center justify-center">
                <IconComponent className="mr-2" size={20} />
                {t('パッケージをインストール')}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PackageList;