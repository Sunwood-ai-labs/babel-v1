import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Send, Paperclip, Smile, MessageSquare } from 'lucide-react';

const ChatInterface = () => {
  const { t } = useTranslation();
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // ダミーデータの読み込み
    setChannels([
      { id: 1, name: 'general' },
      { id: 2, name: 'random' },
      { id: 3, name: 'project-a' },
    ]);
    setMessages([
      { id: 1, user: 'Alice', content: 'こんにちは！', timestamp: '10:00 AM', reactions: ['👍', '😊'] },
      { id: 2, user: 'Bob', content: 'おはようございます！', timestamp: '10:05 AM', reactions: ['🌟'] },
      { id: 3, user: 'Charlie', content: '今日の会議の時間を確認できますか？', timestamp: '10:10 AM', reactions: [] },
    ]);
    setCurrentChannel({ id: 1, name: 'general' });
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        content: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: [],
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 font-sans">
      {/* チャンネルリスト（左サイドバー） */}
      <div className="w-64 bg-indigo-800 text-white p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">{t('Channels')}</h2>
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t('Search channels')}
              className="w-full bg-indigo-700 text-white placeholder-indigo-300 rounded-md py-2 px-3 pr-10"
            />
            <Search className="absolute right-3 top-2.5 text-indigo-300" size={18} />
          </div>
        </div>
        <ul>
          {channels.map((channel) => (
            <li
              key={channel.id}
              className={`py-2 px-3 rounded-md cursor-pointer ${
                currentChannel?.id === channel.id ? 'bg-indigo-700' : 'hover:bg-indigo-700'
              }`}
              onClick={() => setCurrentChannel(channel)}
            >
              # {channel.name}
            </li>
          ))}
        </ul>
      </div>

      {/* メインチャットエリア */}
      <div className="flex-1 flex flex-col">
        {/* ユーザー情報とステータス */}
        <div className="bg-white shadow-md p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">#{currentChannel?.name}</h2>
            <p className="text-sm text-gray-500">3 members</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm">Online</span>
          </div>
        </div>

        {/* メッセージリスト */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="bg-white rounded-lg shadow p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{message.user}</span>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
              </div>
              <p>{message.content}</p>
              <div className="mt-2 flex items-center space-x-2">
                {message.reactions.map((reaction, index) => (
                  <span key={index} className="bg-gray-100 rounded-full px-2 py-1 text-sm">
                    {reaction}
                  </span>
                ))}
                <button className="text-gray-500 hover:text-gray-700">
                  <Smile size={18} />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* メッセージ入力フォーム */}
        <form onSubmit={handleSendMessage} className="bg-white p-4 shadow-md">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={t('Type a message')}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="button" className="text-gray-500 hover:text-gray-700">
              <Paperclip size={20} />
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;