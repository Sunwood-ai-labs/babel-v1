import React, { useState, useEffect } from 'react';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';

const FileExplorer = () => {
  const [files, setFiles] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState({});

  useEffect(() => {
    // ダミーデータを使用してファイル構造をシミュレート
    const dummyFiles = [
      { id: '1', name: 'プロジェクト1', type: 'folder', children: [
        { id: '2', name: 'index.js', type: 'file' },
        { id: '3', name: 'styles', type: 'folder', children: [
          { id: '4', name: 'main.css', type: 'file' }
        ]}
      ]},
      { id: '5', name: 'README.md', type: 'file' },
      { id: '6', name: 'パッケージ', type: 'folder', children: [
        { id: '7', name: 'config.json', type: 'file' }
      ]}
    ];
    setFiles(dummyFiles);
  }, []);

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const renderFileTree = (items) => {
    return items.map((item) => (
      <div key={item.id} className="ml-4">
        {item.type === 'folder' ? (
          <div>
            <div
              className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
              onClick={() => toggleFolder(item.id)}
            >
              {expandedFolders[item.id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              <Folder size={18} className="text-indigo-600 mr-2" />
              <span className="text-gray-800">{item.name}</span>
            </div>
            {expandedFolders[item.id] && item.children && renderFileTree(item.children)}
          </div>
        ) : (
          <div className="flex items-center p-1 hover:bg-gray-100 rounded">
            <File size={18} className="text-gray-600 mr-2" />
            <span className="text-gray-700">{item.name}</span>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">ファイルエクスプローラ</h2>
      <div className="file-explorer">
        {renderFileTree(files)}
      </div>
    </div>
  );
};

export default FileExplorer;