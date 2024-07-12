import React, { useState, useEffect } from 'react';
import { Video, Send, Smile, Hash, User, Plus, Bot, ChevronDown, Folder, Cloud, CheckSquare, Square, AlertCircle, File, Image, ChevronLeft, Menu, MessageSquare, Users, Cpu, FileText } from 'lucide-react';

// DirectoryItemコンポーネントの定義
const DirectoryItem = ({ name, items, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="mb-2">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent ${
            isOpen ? 'border-t-8 border-t-gray-600' : 'border-b-8 border-b-gray-600'
          } mr-2 transition-transform duration-200`}
        />
        {Icon && <Icon className="mr-2" size={18} />}
        <span>{name}</span>
      </div>
      {isOpen && items && (
        <ul className="ml-6 mt-2 space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {item.icon && <item.icon className="mr-2" size={16} />}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};


const MarkdownRenderer = ({ text, isUserMessage }) => {
  const parseMarkdown = (md) => {
    const lines = md.split('\n');
    let inCodeBlock = false;
    let codeContent = '';

    return lines.map((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          const content = (
            <pre key={index} className={`p-3 rounded-md my-2 font-mono text-sm ${isUserMessage ? 'bg-blue-800 text-blue-100' : 'bg-gray-800 text-gray-100'}`}>
              <code>{codeContent}</code>
            </pre>
          );
          inCodeBlock = false;
          codeContent = '';
          return content;
        } else {
          inCodeBlock = true;
          return null;
        }
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return null;
      }

      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold my-2 text-black">{line.slice(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold my-2 text-black">{line.slice(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-bold my-2 text-black">{line.slice(4)}</h3>;
      } else if (line.startsWith('* ')) {
        return <li key={index} className="list-disc ml-6 text-black">{line.slice(2)}</li>;
      } else {
        let formattedLine = line;
        formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedLine = formattedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
        formattedLine = formattedLine.replace(/`([^`]+)`/g, '<code class="bg-gray-200 text-red-500 px-1 rounded">$1</code>');
        return <p key={index} className="my-1 text-black font-sans" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
      }
    }).filter(Boolean);
  };

  return <div className="markdown-content">{parseMarkdown(text)}</div>;
};

const EmojiPicker = ({ onEmojiSelect }) => {
  const emojis = ['👍', '❤️', '😊', '🎉', '🤔', '👀', '🚀', '💯'];
  return (
    <div className="absolute bottom-full left-0 bg-white border border-gray-200 rounded-md p-2 shadow-lg">
      <div className="flex space-x-2">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            className="px-2 py-1 hover:bg-gray-100 rounded"
            onClick={() => onEmojiSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [channelsOpen, setChannelsOpen] = useState(true);
  const [dmOpen, setDmOpen] = useState(true);
  const [llmDmOpen, setLlmDmOpen] = useState(true);
  const [directoryOpen, setDirectoryOpen] = useState(true);
  const [saasListOpen, setSaasListOpen] = useState(true);
  const [taskProgressOpen, setTaskProgressOpen] = useState(true);

  return (
    <div className={`bg-gray-800 text-white font-sans transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
      <button
        className="w-full p-4 text-left flex items-center justify-between"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <>
            <span className="text-xl font-bold">サイドメニュー</span>
            <ChevronLeft size={18} />
          </>
        ) : (
          <Menu size={18} />
        )}
      </button>

      <div className={`p-4 ${sidebarOpen ? '' : 'hidden'}`}>


        <div className="mb-4">
          <button
            className="text-xl font-bold w-full text-left flex items-center"
            onClick={() => setChannelsOpen(!channelsOpen)}
          >
            <MessageSquare className="mr-2" size={18} />
            {sidebarOpen && <span>チャンネル</span>}
            {sidebarOpen && <ChevronDown className={`ml-auto ${channelsOpen ? 'transform rotate-180' : ''}`} size={18} />}
          </button>
          {channelsOpen && sidebarOpen && (
            <ul className="space-y-2 mt-2">
              <li><Hash className="inline mr-2" size={18} />general</li>
              <li><Hash className="inline mr-2" size={18} />random</li>
              <li><Hash className="inline mr-2" size={18} />project-updates</li>
            </ul>
          )}
        </div>



        <div className="mb-4">
          <button
            className="text-xl font-bold w-full text-left flex items-center"
            onClick={() => setDmOpen(!dmOpen)}
          >
            <Users className="mr-2" size={18} />
            {sidebarOpen && <span>メッセージ</span>}
            {sidebarOpen && <ChevronDown className={`ml-auto ${dmOpen ? 'transform rotate-180' : ''}`} size={18} />}
          </button>
          {dmOpen && sidebarOpen && (
            <ul className="space-y-2 mt-2">
              <li><User className="inline mr-2" size={18} />田中</li>
              <li><User className="inline mr-2" size={18} />佐藤</li>
              <li><User className="inline mr-2" size={18} />鈴木</li>
              <li><Bot className="inline mr-2" size={18} />GPT-4</li>
              <li><Bot className="inline mr-2" size={18} />Claude</li>
              <li><Bot className="inline mr-2" size={18} />DALL-E</li>
            </ul>
          )}
        </div>





        <div className="mb-4">
          <button
            className="text-xl font-bold w-full text-left flex items-center"
            onClick={() => setDirectoryOpen(!directoryOpen)}
          >
            <Folder className="mr-2" size={18} />
            {sidebarOpen && <span>アーティファクト</span>}
            {sidebarOpen && <ChevronDown className={`ml-auto ${directoryOpen ? 'transform rotate-180' : ''}`} size={18} />}
          </button>
          {directoryOpen && sidebarOpen && (
            <ul className="space-y-2 mt-2">
              <DirectoryItem
                name="フロントエンド制作物"
                items={[
                  { name: 'ヘッダーコンポーネント.js', icon: File },
                  { name: 'フッターコンポーネント.js', icon: File },
                  { name: 'メインページ.js', icon: File },
                  {
                    name: 'ユーティリティ',
                    icon: Folder,
                    items: [
                      { name: 'APIクライアント.js', icon: File },
                      { name: '状態管理.js', icon: File },
                    ],
                  },
                ]}
              />
              <DirectoryItem
                name="画像"
                items={[
                  { name: 'ロゴ.png', icon: Image },
                  { name: 'ヒーロー画像.jpg', icon: Image },
                  { name: 'アイコンセット.svg', icon: Image },
                  {
                    name: '背景画像',
                    icon: Folder,
                    items: [
                      { name: 'メイン背景.png', icon: Image },
                      { name: 'セカンダリ背景.png', icon: Image },
                    ],
                  },
                ]}
              />
              <DirectoryItem
                name="動画"
                items={[
                  { name: 'プロダクトデモ.mp4', icon: File },
                  { name: 'チュートリアル.webm', icon: File },
                  { name: 'プロモーション動画.mov', icon: File },
                ]}
              />
            </ul>
          )}
        </div>

        <div className="mb-4">
          <button
            className="text-xl font-bold w-full text-left flex items-center"
            onClick={() => setDirectoryOpen(!directoryOpen)}
          >
            <FileText className="mr-2" size={18} />
            {sidebarOpen && <span>要件定義書</span>}
            {sidebarOpen && <ChevronDown className={`ml-auto ${directoryOpen ? 'transform rotate-180' : ''}`} size={18} />}
          </button>
          {directoryOpen && sidebarOpen && (
            <ul className="space-y-2 mt-2">
              <DirectoryItem
                name="プロジェクト資料"
                items={[
                  { name: 'プロジェクト計画書.docx', icon: File },
                  { name: 'リスク管理表.xlsx', icon: File },
                  { name: '予算書.pdf', icon: File },
                ]}
              />
              <DirectoryItem
                name="デザイン案"
                items={[
                  { name: 'ロゴ案.png', icon: Image },
                  { name: 'ワイヤーフレーム.svg', icon: Image },
                  {
                    name: 'カラーパレット',
                    icon: Folder,
                    items: [
                      { name: 'メインカラー.png', icon: File },
                      { name: 'アクセントカラー.png', icon: File },
                    ],
                  },
                ]}
              />
              <DirectoryItem
                name="会議議事録"
                items={[
                  { name: 'キックオフミーティング.md', icon: File },
                  { name: '週次進捗報告.md', icon: File },
                  { name: 'デザインレビュー.md', icon: File },
                ]}
              />
            </ul>
          )}
        </div>

        <div className="mb-4">
          <button
            className="text-xl font-bold w-full text-left flex items-center"
            onClick={() => setSaasListOpen(!saasListOpen)}
          >
            <Cloud className="mr-2" size={18} />
            {sidebarOpen && <span className="text-white">SaaSリスト</span>}
            {sidebarOpen && <ChevronDown className={`ml-auto ${saasListOpen ? 'transform rotate-180' : ''}`} size={18} />}
          </button>
          {saasListOpen && sidebarOpen && (
            <ul className="space-y-2 mt-2">
              <li className="text-white"><Cloud className="inline mr-2" size={18} />チャットマスター</li>
              <li className="text-white"><Cloud className="inline mr-2" size={18} />タスクウィザード</li>
              <li className="text-white"><Cloud className="inline mr-2" size={18} />コードハブ</li>
            </ul>
          )}
        </div>

        <div>
          <button
            className="text-xl font-bold w-full text-left flex items-center"
            onClick={() => setTaskProgressOpen(!taskProgressOpen)}
          >
            <CheckSquare className="mr-2" size={18} />
            {sidebarOpen && <span>タスク進捗</span>}
            {sidebarOpen && <ChevronDown className={`ml-auto ${taskProgressOpen ? 'transform rotate-180' : ''}`} size={18} />}
          </button>
          {taskProgressOpen && sidebarOpen && (
            <div className="space-y-2 mt-2">
              <div className="flex items-center">
                <span className="text-sm mr-2 w-16">デザイン</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '45%'}}></div>
                </div>
                <span className="text-sm ml-2 w-10 text-right">45%</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2 w-16">開発</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{width: '60%'}}></div>
                </div>
                <span className="text-sm ml-2 w-10 text-right">60%</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2 w-16">テスト</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-600 h-2.5 rounded-full" style={{width: '30%'}}></div>
                </div>
                <span className="text-sm ml-2 w-10 text-right">30%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



const NotionSlackHybrid = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "みなさん、おはようございます！今日のスプリントレビューの準備はできていますか？",
      sender: '田中',
      reactions: {},
      timestamp: '9:00 AM'
    },
    {
      id: 2,
      text: "おはようございます。新機能のデモ確認について、いくつか気をつけるべき点があります。特にユーザーインターフェースの改善とパフォーマンス最適化に注目しましょう。例えば、以下のようなポイントを確認するといいでしょう：\n\n1. 操作の直感性\n2. レスポンス速度\n3. デザインの一貫性\n\nこれらの点に注意を払うことで、より良いユーザー体験を提供できるはずです。",
      sender: 'GPT-4',
      reactions: {},
      timestamp: '9:05 AM'
    },
    {
      id: 3,
      text: "GPT-4さん、素晴らしい提案をありがとうございます。次のスプリント計画に向けて、これらのポイントを考慮に入れたいと思います。ところで、デプロイメントスケジュールの確認とリソース配分の見直しについて、誰か情報を持っていますか？",
      sender: '佐藤',
      reactions: {},
      timestamp: '9:10 AM'
    },
    {
      id: 4,
      text: "佐藤さん、課金プログラムのサンプルコードを追加しました。以下のコードを参考に、柔軟な価格設定ができるように実装することをお勧めします：\n\n```jsx\nconst SubscriptionPage = () => {\n  const [plan, setPlan] = useState('basic');\n  const [price, setPrice] = useState(1000);\n\n  const handlePlanChange = (selectedPlan) => {\n    setPlan(selectedPlan);\n    setPrice(selectedPlan === 'basic' ? 1000 : 3000);\n  };\n\n  return (\n    <div>\n      <h2>サブスクリプションプラン</h2>\n      <select value={plan} onChange={(e) => handlePlanChange(e.target.value)}>\n        <option value=\"basic\">ベーシック</option>\n        <option value=\"premium\">プレミアム</option>\n      </select>\n      <p>選択中のプラン: {plan}</p>\n      <p>価格: {price}円/月</p>\n      <button>購入する</button>\n    </div>\n  );\n};\n```\n\nこのコードは基本的な課金システムの構造を示しています。実際の実装では、より多くのプランや複雑な価格設定ロジックを追加できます。",
      sender: 'Claude',
      reactions: {},
      timestamp: '9:15 AM'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [markdownNote, setMarkdownNote] = useState(`
# プロジェクトメモ

## 今日のタスク
- [ ] スプリントレビューの準備
- [ ] 新機能のデモ確認
- [ ] 次のスプリント計画

## アイデア
- ユーザーインターフェースの改善
- パフォーマンス最適化

## 質問事項
1. デプロイメントスケジュールの確認
2. リソース配分の見直し

*メモを自由に編集してください*

## 課金画面のサンプルコード

\`\`\`jsx
const SubscriptionPage = () => {
  const [plan, setPlan] = useState('basic');
  const [price, setPrice] = useState(1000);

  const handlePlanChange = (selectedPlan) => {
    setPlan(selectedPlan);
    setPrice(selectedPlan === 'basic' ? 1000 : 3000);
  };

  return (
    <div>
      <h2>サブスクリプションプラン</h2>
      <select value={plan} onChange={(e) => handlePlanChange(e.target.value)}>
        <option value="basic">ベーシック</option>
        <option value="premium">プレミアム</option>
      </select>
      <p>選択中のプラン: {plan}</p>
      <p>価格: {price}円/月</p>
      <button>購入する</button>
    </div>
  );
};
\`\`\`
  `.trim());
  const [isEditing, setIsEditing] = useState(true);

  const suggestions = [
    "今日のスプリントレビューで重要なポイントは...",
    "新機能のデモについて、さらに詳しく説明すると...",
    "プロジェクトの進捗状況について、",
    "次のスプリントで取り組むべき課題として...",
    "チームのパフォーマンスを向上させるために、",
  ];

  useEffect(() => {
    if (inputValue.length > 0 && inputValue.length % 5 === 0) {
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      setSuggestion(randomSuggestion);
    } else if (inputValue.length === 0) {
      setSuggestion('');
    }
  }, [inputValue]);

  const handleSend = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: inputValue,
        sender: 'あなた',
        reactions: {},
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      setSuggestion('');
    }
  };

  const applySuggestion = () => {
    setInputValue(inputValue + suggestion);
    setSuggestion('');
  };

  const handleReaction = (messageId, emoji) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const updatedReactions = { ...msg.reactions };
        updatedReactions[emoji] = (updatedReactions[emoji] || 0) + 1;
        return { ...msg, reactions: updatedReactions };
      }
      return msg;
    }));
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          {/* チャット欄 */}


          <div className="w-1/2 flex flex-col overflow-hidden">
            <div className="bg-gray-200 p-3 flex justify-between items-center">
              <span className="font-bold text-black font-sans"># general</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center">
                <Video size={18} className="mr-2" />
                <span className="font-sans">ビデオチャット</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <User size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-bold mr-2 text-black font-sans">{message.sender}</span>
                      <span className="text-black text-sm font-sans">{message.timestamp}</span>
                    </div>
                    <div className="mt-1 bg-white rounded-lg p-3 shadow">
                      <MarkdownRenderer text={message.text} isUserMessage={message.sender === 'あなた'} />
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      {Object.entries(message.reactions).map(([emoji, count]) => (
                        <button key={emoji} className="bg-gray-100 rounded-full px-2 py-1 text-sm">
                          {emoji} {count}
                        </button>
                      ))}
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      >
                        <Smile size={18} />
                      </button>
                      {showEmojiPicker && (
                        <EmojiPicker onEmojiSelect={(emoji) => handleReaction(message.id, emoji)} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>


            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Plus size={24} />
                  </button>
                  <textarea
                    className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="メッセージを入力（Markdown対応）"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={1}
                    style={{ height: '50%' }}
                  />
                  <button
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleSend}
                  >
                    <Send size={24} />
                  </button>
                </div>
                {suggestion && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">提案:</span>
                    <button
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      onClick={applySuggestion}
                    >
                      {suggestion}
                    </button>
                  </div>
                )}
                <div className="bg-gray-100 p-2 rounded-md min-h-[100px] overflow-y-auto">
                  <MarkdownRenderer text={inputValue} isUserMessage={false} />
                </div>
              </div>
            </div>
          </div>
          
          {/* マークダウンメモ帳 */}
          <div className="w-1/2 flex flex-col border-l border-gray-300 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-300 px-4 py-2 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-700 font-sans">議事録・制作物</h2>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 rounded font-sans ${isEditing ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'}`}
                  onClick={() => setIsEditing(true)}
                >
                  編集
                </button>
                <button
                  className={`px-3 py-1 rounded font-sans ${!isEditing ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'}`}
                  onClick={() => setIsEditing(false)}
                >
                  プレビュー
                </button>
              </div>
            </div>
            <div className="flex-1 p-4 bg-indigo-100 flex flex-col overflow-hidden">
              <div className="flex-grow h-full overflow-y-auto">
                {isEditing ? (
                  <textarea
                    className="w-full h-full border border-indigo-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-black font-sans"
                    placeholder="マークダウンでメモを取る"
                    value={markdownNote}
                    onChange={(e) => setMarkdownNote(e.target.value)}
                  />
                ) : (
                  <div className="bg-white p-2 rounded-md h-full overflow-y-auto shadow-inner">
                    <MarkdownRenderer text={markdownNote} isUserMessage={false} />
                    <div className="mt-4 border-t border-indigo-300 pt-4">
                      <h2 className="text-xl font-bold mb-4 text-indigo-700">サブスクリプションプラン</h2>
                      <div className="bg-indigo-200 p-4 rounded-md">
                        <select className="w-full mb-2 p-2 border border-indigo-400 rounded">
                          <option value="basic">ベーシック</option>
                          <option value="premium">プレミアム</option>
                        </select>
                        <p className="mb-2 text-indigo-800">選択中のプラン: basic</p>
                        <p className="mb-2 text-indigo-800">価格: 1000円/月</p>
                        <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">購入する</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionSlackHybrid;