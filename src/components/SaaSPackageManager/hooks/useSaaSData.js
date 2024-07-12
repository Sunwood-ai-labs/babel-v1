
import { useState, useEffect } from 'react';
import fetchThumbnail from '../utils/thumbnailFetcher';

const fetchSaaSItems = async () => {
  // APIシミュレーション
  const dummyData = [
    { id: 1, name: 'Share Artifacts', category: '基盤層', status: 'アクティブ', level: 1, description: 'Claude Archfact本家の保管庫！', image: 'https://www.share-artifacts.com/ogp.png', url: 'https://www.share-artifacts.com/' },
    { id: 2, name: 'Midjourney ShowCase', category: '中間層', status: 'アクティブ', level: 2, description: 'AIを使って驚くべき画像を生成！', image: 'https://picsum.photos/400/300?random=2', url: 'https://www.midjourney.com/showcase' },
    { id: 3, name: '未来予測プロジェクト管理', category: '上層', status: 'アクティブ', level: 3, description: 'プロジェクトの結末が見える！', image: 'https://picsum.photos/400/300?random=3', url: '#' },
    { id: 4, name: '脳波同期学習システム', category: '頂上層', status: '非アクティブ', level: 4, description: '寝ている間に知識がインストール！', image: 'https://picsum.photos/400/300?random=4', url: '#' },
    { id: 5, name: '全知全能AIアシスタント', category: '天空層', status: 'アクティブ', level: 5, description: '神にも匹敵する知恵を授かれ！', image: 'https://picsum.photos/400/300?random=5', url: '#' },
  ];
  return dummyData;
};

const useSaaSData = () => {
  const [saasItems, setSaasItems] = useState([]);

  useEffect(() => {
    const loadSaaSItems = async () => {
      const items = await fetchSaaSItems();
      setSaasItems(items);
    };
    loadSaaSItems();
  }, []);

  useEffect(() => {
    const updateShareArtifactsThumbnail = async () => {
      const thumbnail = await fetchThumbnail('https://www.share-artifacts.com/');
      if (thumbnail) {
        setSaasItems(prevItems => 
          prevItems.map(item => 
            item.id === 1 ? { ...item, image: thumbnail } : item
          )
        );
      }
    };

    updateShareArtifactsThumbnail();
  }, []);

  const addSaaSItem = (newItem) => {
    setSaasItems(prevItems => [
      ...prevItems,
      {
        ...newItem,
        id: prevItems.length + 1,
        image: `https://picsum.photos/400/300?random=${prevItems.length + 1}`,
        status: 'アクティブ',
        level: Math.floor(Math.random() * 5) + 1
      }
    ]);
  };

  return { saasItems, setSaasItems, addSaaSItem };
};

export default useSaaSData;
