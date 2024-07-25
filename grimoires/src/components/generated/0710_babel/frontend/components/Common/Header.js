import React, { useState, useEffect } from 'react';
import { Bell, User, Search } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // ダミーユーザーデータ
    setUser({
      name: '山田太郎',
      avatar: 'https://placehold.jp/40x40.png',
    });

    // ダミー通知データ
    setNotifications([
      { id: 1, message: t('New message from team'), read: false },
      { id: 2, message: t('Project update available'), read: true },
    ]);
  }, [t]);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {t('Babel SaaS')}
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder={t('Search...')}
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <LanguageSwitcher />
          
          <div className="relative">
            <Bell className="text-gray-600 cursor-pointer" size={24} />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </div>

          {user && (
            <div className="flex items-center space-x-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
            </div>
          )}

          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
            {t('New Project')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;