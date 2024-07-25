import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Package, Code, Users, Settings, ChevronDown, ChevronUp } from 'lucide-react';

const Sidebar = () => {
  const { t } = useTranslation();
  const [activeMenu, setActiveMenu] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // ダミーデータを使用してAPIレスポンスをシミュレート
    const dummyMenuItems = [
      { id: 'home', icon: Home, label: t('sidebar.home') },
      { id: 'saas', icon: Package, label: t('sidebar.saasPackages') },
      { id: 'ide', icon: Code, label: t('sidebar.ide') },
      { id: 'collaboration', icon: Users, label: t('sidebar.collaboration') },
      { id: 'settings', icon: Settings, label: t('sidebar.settings') },
    ];
    setMenuItems(dummyMenuItems);
  }, [t]);

  const toggleMenu = (menuId) => {
    setActiveMenu(activeMenu === menuId ? '' : menuId);
  };

  return (
    <aside className="bg-gray-100 w-64 min-h-screen p-4 border-r border-gray-200">
      <div className="flex items-center justify-center mb-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-semibold">B</span>
        </div>
        <h1 className="ml-3 text-xl font-semibold text-gray-800">Babel SaaS</h1>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => toggleMenu(item.id)}
                className={`w-full flex items-center justify-between p-2 rounded-md transition-colors duration-200 ${
                  activeMenu === item.id
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {activeMenu === item.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {activeMenu === item.id && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <a href="#" className="block p-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors duration-200">
                      {t('sidebar.subitem1')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block p-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors duration-200">
                      {t('sidebar.subitem2')}
                    </a>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center p-2 rounded-md hover:bg-gray-200 transition-colors duration-200">
          <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
          <span className="text-sm font-medium text-gray-700">{t('sidebar.userProfile')}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;