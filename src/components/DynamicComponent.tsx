'use client'

import dynamic from 'next/dynamic'

const DynamicComponent = ({ componentName }: { componentName: string }) => {
  const Component = dynamic(() => {
    switch (componentName) {
      case 'ChatInterface':
        return import('./CollaborationHub/ChatInterface')
      case 'VersionControl':
        return import('./ProjectDashboard/VersionControl')
      case 'SaaSList':
        return import('./SaaSPackageManager/SaaSList')
      case 'PackageList':
        return import('./SaaSPackageManager/PackageList')
      case 'MonacoEditor':
        return import('./IDE/MonacoEditor')
      default:
        return Promise.resolve(() => (
          <div className="text-red-600 font-semibold p-4 bg-red-100 rounded-md">
            コンポーネントが見つかりません: {componentName}
          </div>
        ))
    }
  }, {
    loading: () => <div>Loading...</div>,
  })

  return <Component />
}

export default DynamicComponent