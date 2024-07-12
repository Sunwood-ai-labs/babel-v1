export const getDummyData = () => {
  const ダミーコミット = [
    { id: '1', メッセージ: '初期コミット', 作成者: '山田太郎', 日付: '2023-05-01' },
    { id: '2', メッセージ: '新機能追加', 作成者: '佐藤花子', 日付: '2023-05-02' },
    { id: '3', メッセージ: 'バグ修正', 作成者: '鈴木一郎', 日付: '2023-05-03' },
  ];

  const ダミーブランチ = ['main', 'develop', 'feature/新機能'];

  const ダミーディレクトリ構造 = [
    { id: 'root', name: 'プロジェクトルート', type: 'directory', children: ['src', 'public', 'package.json', 'README.md'] },
    { id: 'src', name: 'src', type: 'directory', children: ['components', 'pages', 'App.js', 'index.js'] },
    { id: 'public', name: 'public', type: 'directory', children: ['index.html', 'favicon.ico'] },
    { id: 'components', name: 'components', type: 'directory', children: ['Header.js', 'Footer.js'] },
    { id: 'pages', name: 'pages', type: 'directory', children: ['Home.js', 'About.js'] },
  ];

  const ファイル = [
    { id: 'App.js', name: 'App.js', type: 'file' },
    { id: 'index.js', name: 'index.js', type: 'file' },
    { id: 'index.html', name: 'index.html', type: 'file' },
    { id: 'favicon.ico', name: 'favicon.ico', type: 'file' },
    { id: 'package.json', name: 'package.json', type: 'file' },
    { id: 'README.md', name: 'README.md', type: 'file' },
    { id: 'Header.js', name: 'Header.js', type: 'file' },
    { id: 'Footer.js', name: 'Footer.js', type: 'file' },
    { id: 'Home.js', name: 'Home.js', type: 'file' },
    { id: 'About.js', name: 'About.js', type: 'file' },
  ];

  return { ダミーコミット, ダミーブランチ, ダミーディレクトリ構造, ファイル };
};