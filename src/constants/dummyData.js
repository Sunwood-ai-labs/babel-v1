export const getDummyData = () => {
  const ダミーコミット = [
    { id: '1', メッセージ: '初期コミット', 作成者: '山田太郎', 日付: '2023-05-01' },
    { id: '2', メッセージ: '新機能追加', 作成者: '佐藤花子', 日付: '2023-05-02' },
    { id: '3', メッセージ: 'ログインのバグ修正', 作成者: '鈴木一郎', 日付: '2023-05-03' },
    { id: '4', メッセージ: 'UIデザイン更新', 作成者: '田中美咲', 日付: '2023-05-04' },
    { id: '5', メッセージ: 'パフォーマンス最適化', 作成者: '高橋健太', 日付: '2023-05-05' },
  ];

  const ダミーブランチ = ['main', 'develop', 'feature/新UI', 'hotfix/login-bug'];

  const ダミーディレクトリ構造 = [
    { id: 'root', name: 'プロジェクトルート', type: 'directory', children: ['src', 'public', 'package.json', 'README.md', '.gitignore', '.env', 'tsconfig.json', 'jest.config.js', 'babel.config.js', 'webpack.config.js'] },
    { id: 'src', name: 'src', type: 'directory', children: ['components', 'pages', 'utils', 'hooks', 'styles', 'assets', 'App.js', 'index.js'] },
    { id: 'public', name: 'public', type: 'directory', children: ['index.html', 'favicon.ico', 'manifest.json', 'robots.txt'] },
    { id: 'components', name: 'components', type: 'directory', children: ['Header.js', 'Footer.js'] },
    { id: 'pages', name: 'pages', type: 'directory', children: ['Home.js', 'About.js', 'Contact.js'] },
    { id: 'utils', name: 'utils', type: 'directory', children: ['api.js'] },
    { id: 'hooks', name: 'hooks', type: 'directory', children: ['useAuth.js'] },
    { id: 'styles', name: 'styles', type: 'directory', children: [] },
    { id: 'assets', name: 'assets', type: 'directory', children: [] },
  ];

  // ファイル情報を追加
  const ファイル = [
    { id: 'App.js', name: 'App.js', type: 'file' },
    { id: 'index.js', name: 'index.js', type: 'file' },
    { id: 'index.html', name: 'index.html', type: 'file' },
    { id: 'favicon.ico', name: 'favicon.ico', type: 'file' },
    { id: 'manifest.json', name: 'manifest.json', type: 'file' },
    { id: 'robots.txt', name: 'robots.txt', type: 'file' },
    { id: 'package.json', name: 'package.json', type: 'file' },
    { id: 'README.md', name: 'README.md', type: 'file' },
    { id: '.gitignore', name: '.gitignore', type: 'file' },
    { id: '.env', name: '.env', type: 'file' },
    { id: 'tsconfig.json', name: 'tsconfig.json', type: 'file' },
    { id: 'jest.config.js', name: 'jest.config.js', type: 'file' },
    { id: 'babel.config.js', name: 'babel.config.js', type: 'file' },
    { id: 'webpack.config.js', name: 'webpack.config.js', type: 'file' },
    { id: 'Header.js', name: 'Header.js', type: 'file' },
    { id: 'Footer.js', name: 'Footer.js', type: 'file' },
    { id: 'Home.js', name: 'Home.js', type: 'file' },
    { id: 'About.js', name: 'About.js', type: 'file' },
    { id: 'Contact.js', name: 'Contact.js', type: 'file' },
    { id: 'api.js', name: 'api.js', type: 'file' },
    { id: 'useAuth.js', name: 'useAuth.js', type: 'file' },
  ];
  return { ダミーコミット, ダミーブランチ, ダミーディレクトリ構造, ファイル };

};