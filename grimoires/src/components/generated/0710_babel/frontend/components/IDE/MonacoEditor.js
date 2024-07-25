import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FileText, Save, RefreshCw } from 'lucide-react';

const MonacoEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');

  useEffect(() => {
    // ダミーデータを使用してAPIからコードを取得
    const fetchCode = async () => {
      // 実際のAPIコールの代わりにダミーデータを使用
      const dummyCode = `
// Welcome to the Babel SaaS Platform
function greet(name) {
  console.log(\`こんにちは、\${name}さん！\`);
}

greet('開発者');
      `;
      setCode(dummyCode.trim());
    };

    fetchCode();
  }, []);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleSave = () => {
    console.log('Code saved:', code);
    // ここで保存のロジックを実装
  };

  const handleRefresh = () => {
    // ここでコードのリフレッシュロジックを実装
    console.log('Code refreshed');
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">コードエディタ</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
          >
            <Save className="w-4 h-4 mr-2" />
            保存
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            リフレッシュ
          </button>
        </div>
      </div>
      <div className="flex-grow border border-gray-300 rounded-lg overflow-hidden">
        <Editor
          height="100%"
          language={language}
          theme={theme}
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
          }}
        />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <FileText className="w-5 h-5 mr-2 text-gray-600" />
          <span className="text-sm text-gray-600">言語: {language}</span>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-2 py-1 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
      </div>
    </div>
  );
};

export default MonacoEditor;