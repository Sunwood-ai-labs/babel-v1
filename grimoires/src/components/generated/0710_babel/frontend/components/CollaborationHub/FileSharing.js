import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, File, Download, Trash2 } from 'lucide-react';

const FileSharing = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // ダミーデータを使用してAPIの動作をシミュレート
    const dummyFiles = [
      { id: 1, name: '企画書.pdf', size: '2.5 MB', uploadedBy: '山田太郎', uploadDate: '2023-05-15' },
      { id: 2, name: 'プレゼンテーション.pptx', size: '5.1 MB', uploadedBy: '佐藤花子', uploadDate: '2023-05-16' },
      { id: 3, name: 'コード_サンプル.zip', size: '1.8 MB', uploadedBy: '鈴木一郎', uploadDate: '2023-05-17' },
    ];

    setTimeout(() => {
      setFiles(dummyFiles);
    }, 1000);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      // ファイルアップロードのシミュレーション
      setTimeout(() => {
        const newFile = {
          id: files.length + 1,
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadedBy: 'Current User',
          uploadDate: new Date().toISOString().split('T')[0],
        };
        setFiles([...files, newFile]);
        setUploading(false);
      }, 2000);
    }
  };

  const handleFileDelete = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t('fileSharing.title')}</h2>
      
      <div className="mb-6">
        <label htmlFor="fileUpload" className="cursor-pointer inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300">
          <Upload className="mr-2" size={20} />
          {t('fileSharing.uploadButton')}
        </label>
        <input id="fileUpload" type="file" className="hidden" onChange={handleFileUpload} />
        {uploading && <span className="ml-4 text-sm text-gray-600">{t('fileSharing.uploading')}</span>}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">{t('fileSharing.fileName')}</th>
              <th className="py-2 px-4 border-b text-left">{t('fileSharing.size')}</th>
              <th className="py-2 px-4 border-b text-left">{t('fileSharing.uploadedBy')}</th>
              <th className="py-2 px-4 border-b text-left">{t('fileSharing.uploadDate')}</th>
              <th className="py-2 px-4 border-b text-left">{t('fileSharing.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center">
                    <File className="mr-2" size={20} />
                    {file.name}
                  </div>
                </td>
                <td className="py-2 px-4 border-b">{file.size}</td>
                <td className="py-2 px-4 border-b">{file.uploadedBy}</td>
                <td className="py-2 px-4 border-b">{file.uploadDate}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">
                    <Download size={20} />
                  </button>
                  <button className="text-red-600 hover:text-red-800" onClick={() => handleFileDelete(file.id)}>
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileSharing;