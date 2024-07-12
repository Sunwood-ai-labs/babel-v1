import os
import json
import subprocess
from datetime import datetime

def create_file(path, content):
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    
    if os.path.exists(path):
        while True:
            response = input(f"警告: ファイル {path} は既に存在します。上書きしますか？ (yes/no): ").lower()
            if response in ['yes', 'no']:
                break
            print("'yes' または 'no' で回答してください。")
        
        if response == 'no':
            print(f"ファイル {path} はスキップされました。")
            return
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"ファイルを作成しました: {path}")

def run_command(command):
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    if process.returncode != 0:
        print(f"エラー: コマンド '{command}' の実行中にエラーが発生しました。")
        print(stderr.decode())
    else:
        print(f"コマンド '{command}' が正常に実行されました。")

def main():
    project_name = "babel-v1"
    
    files = {
        'package.json': json.dumps({
            "name": project_name,
            "version": "0.1.0",
            "private": True,
            "scripts": {
                "dev": "next dev",
                "build": "next build",
                "start": "next start",
                "lint": "next lint"
            },
            "dependencies": {
                "next": "latest",
                "react": "latest",
                "react-dom": "latest",
                "lucide-react": "latest"
            },
            "devDependencies": {
                "typescript": "latest",
                "@types/react": "latest",
                "@types/node": "latest",
                "tailwindcss": "latest",
                "postcss": "latest",
                "autoprefixer": "latest"
            }
        }, indent=2),
        
        'tsconfig.json': json.dumps({
            "compilerOptions": {
                "target": "es5",
                "lib": ["dom", "dom.iterable", "esnext"],
                "allowJs": True,
                "skipLibCheck": True,
                "strict": True,
                "forceConsistentCasingInFileNames": True,
                "noEmit": True,
                "esModuleInterop": True,
                "module": "esnext",
                "moduleResolution": "node",
                "resolveJsonModule": True,
                "isolatedModules": True,
                "jsx": "preserve",
                "incremental": True,
                "plugins": [
                    {
                        "name": "next"
                    }
                ],
                "paths": {
                    "@/*": ["./src/*"]
                }
            },
            "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
            "exclude": ["node_modules"]
        }, indent=2),
        
        'src/styles/globals.css': '''
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}
''',
        'tailwind.config.js': '''
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
''',
    }

    for path, content in files.items():
        create_file(path, content.strip())

    print(f"\n{project_name} プロジェクトのファイル生成が完了しました。")
    
    print("\n必要なパッケージをインストールします...")
    run_command("npm install")
    
    print("\nTailwind CSSの設定を初期化します...")
    run_command("npx tailwindcss init -p")
    
    print(f"\n{project_name} プロジェクトのセットアップが完了しました。")
    print("\nプロジェクトを起動するには、以下のコマンドを実行してください:")
    print("npm run dev")

if __name__ == "__main__":
    main()