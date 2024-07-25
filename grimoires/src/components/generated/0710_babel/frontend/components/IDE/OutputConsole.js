import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Terminal, AlertCircle, CheckCircle } from 'lucide-react';

const OutputConsole = () => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // ダミーデータを使用してログを模倣
    const dummyLogs = [
      { type: 'info', message: 'Compilation started' },
      { type: 'warning', message: 'Unused variable detected: x' },
      { type: 'error', message: 'Syntax error on line 42' },
      { type: 'success', message: 'Compilation completed successfully' },
    ];

    const fetchLogs = async () => {
      // APIコールをシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLogs(dummyLogs);
    };

    fetchLogs();
  }, []);

  const getIconForLogType = (type) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="text-red-500" />;
      case 'warning':
        return <AlertCircle className="text-yellow-500" />;
      case 'success':
        return <CheckCircle className="text-green-500" />;
      default:
        return <Terminal className="text-blue-500" />;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">
        {t('outputConsole.title')}
      </h2>
      <div className="bg-gray-100 rounded-md p-4 h-64 overflow-y-auto font-mono text-sm">
        {logs.map((log, index) => (
          <div key={index} className="flex items-start mb-2">
            <span className="mr-2">{getIconForLogType(log.type)}</span>
            <span className={`flex-grow ${log.type === 'error' ? 'text-red-600' : 'text-gray-700'}`}>
              {t(`outputConsole.messages.${log.message}`)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          {t('outputConsole.clearButton')}
        </button>
      </div>
    </div>
  );
};

export default OutputConsole;