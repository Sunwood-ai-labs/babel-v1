import { useState, useEffect } from 'react';
import { getDummyData } from '../constants/dummyData';

export const useVersionControlData = () => {
  const [コミット, setコミット] = useState([]);
  const [ブランチ, setブランチ] = useState([]);
  const [選択中のブランチ, set選択中のブランチ] = useState('main');
  const [ファイル構造, setファイル構造] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const データ取得 = async () => {
      // 実際のAPIコールの代わりにタイムアウトを使用
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { ダミーコミット, ダミーブランチ, ダミーファイル構造 } = getDummyData();

      setコミット(ダミーコミット);
      setブランチ(ダミーブランチ);
      setファイル構造(ダミーファイル構造);
    };

    データ取得();
  }, []);

  return { コミット, ブランチ, 選択中のブランチ, set選択中のブランチ, ファイル構造 };
};