import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GitBranch, GitCommit, GitMerge, GitPullRequest, Plus, Search } from 'lucide-react';
import { Gitgraph, Orientation } from "@gitgraph/react";
import { useVersionControlData } from '../../hooks/useVersionControlData';
import { withoutAuthor } from '../../utils/gitGraphTemplate';
import { getDummyData } from '../../constants/dummyData';
import { FileStructure } from './ForceGraphComponents';
import { useSearchParams } from 'next/navigation';


// 新しいシステム作成ダイアログコンポーネント
// const CreateSystemDialog = ({ isOpen, onClose, onCreate }: { isOpen: boolean; onClose: () => void; onCreate: (name: string) => void }) => {
//   const { t } = useTranslation();
//   const [newSystemName, setNewSystemName] = useState('');
//   const [isCreating, setIsCreating] = useState(false);
//   const [error, setError] = useState('');

//   const handleCreate = async () => {
//     if (newSystemName.trim() === '') {
//       setError(t('システム名を入力してください'));
//       return;
//     }
//     setIsCreating(true);
//     setError('');
//     try {
//       // APIにPOSTリクエストを送信
//       const response = await fetch(`http://localhost:8000/create_new_system?name=${encodeURIComponent(newSystemName)}`, {
//         method: 'POST',
//         headers: {
//           'accept': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error('APIリクエストが失敗しました');
//       }

//       const result = await response.json();
//       console.log(result);

//       onClose();
//     } catch (err) {
//       console.error('システム作成エラー:', err);
//       setError(t('システムの作成に失敗しました。もう一度お試しく���さい。'));
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-[#e0e0e0] border-[#4a00e0] rounded-xl shadow-2xl">
//         <DialogHeader>
//           <DialogTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7f00ff] to-[#e100ff]">
//             {t('新規システム作成')}
//           </DialogTitle>
//         </DialogHeader>
//         <Input
//           type="text"
//           placeholder={t('システム名')}
//           value={newSystemName}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSystemName(e.target.value)}
//           className="w-full pl-4 pr-4 py-3 text-lg bg-[#2a2a4a] border-2 border-[#4a00e0] focus:outline-none focus:ring-2 focus:ring-[#7f00ff] focus:border-[#7f00ff] rounded-lg font-sans text-[#ffffff] transition duration-300 ease-in-out placeholder-[#8a8a9a]"
//         />
//         {error && <p className="text-red-500 mt-2">{error}</p>}
//         <DialogFooter>
//           <Button 
//             onClick={handleCreate} 
//             disabled={isCreating}
//             className="px-6 py-3 bg-gradient-to-r from-[#7f00ff] to-[#e100ff] text-[#ffffff] rounded-lg hover:from-[#9500ff] hover:to-[#ff00ff] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7f00ff] focus:ring-opacity-50 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isCreating ? t('作成中...') : t('作成')}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// Button コンポーネント
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Input コンポーネント
const Input = ({ className, ...props }) => (
  <input
    className={`px-3 py-2 border border-gray-300 rounded ${className}`}
    {...props}
  />
);

// Dialog関連のコンポーネント
const Dialog = ({ children, open, onOpenChange }) => (
  open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {children}
        <button onClick={() => onOpenChange(false)}>Close</button>
      </div>
    </div>
  ) : null
);

// システムディレクトリ選択コンポーネント
interface SystemDirectorySelectorProps {
  onSelectDirectory: (selectedDirectory: { value: string; label: string; path: string }) => void;
  options: Array<{ value: string; label: string; path: string }>;
  onCreateNewSystem: () => void;
}

const SystemDirectorySelector: React.FC<SystemDirectorySelectorProps> = ({ onSelectDirectory, options, onCreateNewSystem }) => {
  const [selectedDirectory, setSelectedDirectory] = useState("");
  const { t } = useTranslation();

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedDirectory(value);
    const selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      onSelectDirectory(selectedOption);
    }
  };

  return (
    <div className="mb-4 flex items-center">
      <select 
        onChange={handleSelectChange} 
        value={selectedDirectory}
        className="w-full pl-4 pr-10 py-2 text-lg bg-[#3c3c3c] border-2 border-[#007acc] focus:outline-none focus:ring-2 focus:ring-[#007acc] focus:border-[#007acc] rounded-lg font-sans text-[#ffffff] transition duration-300 ease-in-out mr-2"
      >
        <option value="">{t('システムを選択')}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <button
        onClick={onCreateNewSystem}
        className="px-4 py-2 bg-gradient-to-r from-[#007acc] to-[#0056b3] text-[#ffffff] rounded-lg hover:from-[#0056b3] hover:to-[#003d82] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#007acc] focus:ring-opacity-50"
      >
        {t('新規作成')}
      </button>
    </div>
  );
};

// AIチャットコンポーネント
const AIChat = React.memo(({ nodes, onClose, position }) => {
  // ... (AIChat component code remains unchanged)
});

// Gitグラフコンポーネント
const GitGraph = React.memo(() => {
  // ... (GitGraph component code remains unchanged)
});

export function VersionControl() {
  const { t } = useTranslation();
  const { コミット, ブランチ, 選択中のブランチ, set選択中のブランチ } = useVersionControlData();
  const { ダミーディレクトリ構造, ファイル } = useMemo(() => getDummyData(), []);

  const createFileStructureData = useCallback(() => {
    const nodes = [...ダミーディレクトリ構造, ...ファイル];
    const links = [];

    ダミーディレクトリ構造.forEach(dir => {
      dir.children.forEach(childId => {
        links.push({ source: dir.id, target: childId, value: 1 });
      });
    });

    return { nodes, links };
  }, [ダミーディレクトリ構造, ファイル]);

  const ファイル構造データ = useMemo(() => createFileStructureData(), [createFileStructureData]);

  const [選択中ノード, set選択中ノード] = useState(null);
  const [チャット位置, setチャット位置] = useState({ x: 0, y: 0 });
  const [選択されたシステム, set選択されたシステム] = useState('');
  const [directoryOptions, setDirectoryOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateSystemDialogOpen, setIsCreateSystemDialogOpen] = useState(false);

  const ノード選択処理 = useCallback((ノード, event) => {
    set選択中ノード(前のノード => 前のノード && 前のノード.id === ノード.id ? null : ノード);
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      setチャット位置({ x: rect.right, y: rect.top });
    }
  }, []);

  const ディレクトリ選択処理 = (選択されたディレクトリ) => {
    console.log('選択されたディレクトリ:', 選択されたディレクトリ);
    set選択されたシステム(選択されたディレクトリ.value);
  };

  const 新規システム作成処理 = () => {
    set選択されたシステム('');
    setIsCreateSystemDialogOpen(true);
  };

  useEffect(() => {
    const fetchGeneratedDirs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/generated-dirs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('取得したデータ:', data);
        const options = data.map(dir => ({
          value: dir.name,
          label: dir.name,
          path: dir.path,
          image: `https://picsum.photos/200/300?random=magic${dir.name}`
        }));
        setDirectoryOptions(options);
      } catch (error) {
        console.error('生成されたディレクトリの取得に失敗しました:', error);
        // エラーメッセージをユーザーに表示するなどの処理を追加
      }
    };

    fetchGeneratedDirs();
  }, []);

  const filteredDirectoryOptions = directoryOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateSystem = async (newSystemName) => {
    try {
      const response = await fetch('http://localhost:8000/api/create-system', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newSystemName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('新しいシステムが作成されました:', result);

      setDirectoryOptions(prevOptions => [
        ...prevOptions,
        {
          value: result.name,
          label: result.name,
          path: result.path,
          image: `https://picsum.photos/200/300?random=magic${result.name}`
        }
      ]);

    } catch (error) {
      console.error('システムの作成に失敗しました:', error);
      alert(t('システムの作成に失敗しました。もう一度お試しください。'));
    }
  };

  const searchParams = useSearchParams();

  useEffect(() => {
    const systemFromUrl = searchParams.get('system');
    if (systemFromUrl) {
      set選択されたシステム(decodeURIComponent(systemFromUrl));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a2a2a] to-[#1e1e1e] text-[#e0e0e0] p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#ffffff] font-sans">
          {選択されたシステム ? 'システム名: '+選択されたシステム : t('システム一覧')}
        </h2>
        <div className="w-64">
          <SystemDirectorySelector 
            onSelectDirectory={ディレクトリ選択処理} 
            options={directoryOptions} 
            onCreateNewSystem={新規システム作成処理}
          />
        </div>
      </div>
      
      {選択されたシステム ? (
        <>
          <div className="relative h-[600px] mb-8">
            <FileStructure 
              ファイル構造データ={ファイル構造データ} 
              onNodeClick={ノード選択処理} 
              選択されたシステム={選択されたシステム}
            />
            {選択中ノード && (
              <AIChat 
                nodes={[選択中ノード]} 
                onClose={() => set選択中ノード(null)}
                position={チャット位置}
              />
            )}
          </div>

          <div className="mb-8">
            <label htmlFor="branch-select" className="block text-lg font-medium text-[#e0e0e0] mb-3 font-sans">
              {t('ブランチ選択')}
            </label>
            <select
              id="branch-select"
              value={選択中のブランチ}
              onChange={(e) => set選択中のブランチ(e.target.value)}
              className="w-full pl-4 pr-10 py-3 text-lg bg-[#3c3c3c] border-2 border-[#007acc] focus:outline-none focus:ring-2 focus:ring-[#007acc] focus:border-[#007acc] rounded-lg font-sans text-[#ffffff] transition duration-300 ease-in-out"
            >
              {ブランチ.map((ブランチ名) => (
                <option key={ブランチ名} value={ブランチ名}>{ブランチ名}</option>
              ))}
            </select>
          </div>

          <GitGraph />

          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-5 text-[#ffffff] font-sans">{t('最近のコミット')}</h3>
            <div className="space-y-4">
              {コミット.map((コミット) => (
                <div key={コミット.id} className="flex items-start p-5 bg-gradient-to-r from-[#2d2d2d] to-[#252525] rounded-lg border-l-4 border-[#007acc] shadow-md transition duration-300 ease-in-out hover:shadow-lg">
                  <GitCommit className="text-[#007acc] mr-4 flex-shrink-0 w-6 h-6" />
                  <div>
                    <p className="font-bold text-lg text-[#ffffff] font-sans mb-1">{コミット.メッセージ}</p>
                    <p className="text-sm text-[#b0b0b0] font-sans">
                      {t('作成者')} <span className="text-[#007acc]">{コミット.作成者}</span> • {t('日付')} <span className="text-[#007acc]">{コミット.日付}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-between">
            <Button className="flex items-center px-6 py-3 bg-gradient-to-r from-[#007acc] to-[#0056b3] text-[#ffffff] rounded-full hover:from-[#0056b3] hover:to-[#003d82] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#007acc] focus:ring-opacity-50 shadow-lg">
              <GitBranch className="mr-2 w-5 h-5" />
              <span className="text-lg font-medium">{t('新規ブランチ')}</span>
            </Button>
            <Button className="flex items-center px-6 py-3 bg-gradient-to-r from-[#388e3c] to-[#2e7d32] text-[#ffffff] rounded-full hover:from-[#2e7d32] hover:to-[#1b5e20] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#388e3c] focus:ring-opacity-50 shadow-lg">
              <GitMerge className="mr-2 w-5 h-5" />
              <span className="text-lg font-medium">{t('マージ')}</span>
            </Button>
            <Button className="flex items-center px-6 py-3 bg-gradient-to-r from-[#0288d1] to-[#01579b] text-[#ffffff] rounded-full hover:from-[#01579b] hover:to-[#01426a] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0288d1] focus:ring-opacity-50 shadow-lg">
              <GitPullRequest className="mr-2 w-5 h-5" />
              <span className="text-lg font-medium">{t('プルリクエスト')}</span>
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <p className="text-2xl font-bold text-[#ffffff] mb-4">{t('システムディレクトリを選択してください')}</p>
          <p className="text-lg text-[#b0b0b0] mb-8">{t('または新しいシステムを作成してください')}</p>
          <Button
            onClick={新規システム作成処理}
            className="px-6 py-3 bg-gradient-to-r from-[#007acc] to-[#0056b3] text-[#ffffff] rounded-full hover:from-[#0056b3] hover:to-[#003d82] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#007acc] focus:ring-opacity-50 shadow-lg"
          >
            {t('新規システム作成')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.memo(VersionControl);