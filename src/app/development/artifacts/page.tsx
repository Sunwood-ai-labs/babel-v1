'use client'

import Sidebar from '@/components/Sidebar'
import DynamicComponent from '@/components/DynamicComponent'

export default function ArtifactsPage() {
  return (
    <div className="flex h-screen">
      {/* サイドバーコンポーネント */}
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative bg-gradient-to-b from-gray-100 to-gray-200">
        {/* パッケージリストを表示するダイナミックコンポーネント */}
        <DynamicComponent componentName="PackageList" />
      </main>
    </div>
  );
}
