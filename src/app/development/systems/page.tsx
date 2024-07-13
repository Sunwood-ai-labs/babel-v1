'use client'

import Sidebar from '@/components/Sidebar'
import DynamicComponent from '@/components/DynamicComponent'

export default function SystemsPage() {
  return (
    <div className="flex h-screen">
      {/* サイドバーコンポーネント */}
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative bg-gradient-to-b from-gray-100 to-gray-200">
        {/* バージョン管理コンポーネント */}
        <DynamicComponent componentName="SaaSList" />
      </main>
    </div>
  );
}