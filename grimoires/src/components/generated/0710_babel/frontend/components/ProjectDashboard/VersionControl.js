import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GitBranch, GitCommit, GitMerge, GitPullRequest } from 'lucide-react';

const VersionControl = () => {
  const { t } = useTranslation();
  const [commits, setCommits] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('main');

  useEffect(() => {
    // ダミーデータの読み込み
    const fetchData = async () => {
      // 実際のAPIコールの代わりにダミーデータを使用
      const dummyCommits = [
        { id: '1', message: 'Initial commit', author: 'John Doe', date: '2023-05-01' },
        { id: '2', message: 'Add new feature', author: 'Jane Smith', date: '2023-05-02' },
        { id: '3', message: 'Fix bug in login', author: 'Bob Johnson', date: '2023-05-03' },
      ];
      const dummyBranches = ['main', 'develop', 'feature/new-ui'];

      setCommits(dummyCommits);
      setBranches(dummyBranches);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('versionControl.title')}</h2>
      
      <div className="mb-6">
        <label htmlFor="branch-select" className="block text-sm font-medium text-gray-700 mb-2">
          {t('versionControl.selectBranch')}
        </label>
        <select
          id="branch-select"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {branches.map((branch) => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {commits.map((commit) => (
          <div key={commit.id} className="flex items-start p-4 bg-gray-50 rounded-md">
            <GitCommit className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
            <div>
              <p className="font-medium text-gray-900">{commit.message}</p>
              <p className="text-sm text-gray-500">
                {t('versionControl.by')} {commit.author} {t('versionControl.on')} {commit.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <GitPullRequest className="w-4 h-4 mr-2" />
          {t('versionControl.createPullRequest')}
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          <GitMerge className="w-4 h-4 mr-2" />
          {t('versionControl.mergeBranch')}
        </button>
      </div>
    </div>
  );
};

export default VersionControl;