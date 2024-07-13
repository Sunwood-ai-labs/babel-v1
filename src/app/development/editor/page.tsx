'use client'

import { useSearchParams } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import DynamicComponent from '@/components/DynamicComponent'

export default function EditorPage() {
  const searchParams = useSearchParams()
  const project = searchParams.get('project')

  return (
    <div className="flex h-screen">
      {/* サイドバーコンポーネント */}
      <Sidebar />
      {/* メインコンテンツエリア */}
      <main className="flex-1 overflow-y-auto relative bg-gradient-to-b from-gray-100 to-gray-200">
        {/* バージョン管理コンポーネント */}
        <DynamicComponent componentName="VersionControl" project={project} />
      </main>
    </div>
  );
}