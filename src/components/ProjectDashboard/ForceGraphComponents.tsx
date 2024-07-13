import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ForceGraph2D } from 'react-force-graph';
import { fetchDirectoryStructure } from '../../utils/api';
import { transformApiResponse } from '../../utils/transformApiResponse';
import useFileChanges from '../../hooks/useFileChanges';

export const FileStructure = React.memo(({ onNodeClick, 選択されたシステム }) => {
  const fgRef = useRef();
  const { t } = useTranslation();
  const [選択中ノード, set選択中ノード] = useState([]);
  const [ディレクトリ構造, setディレクトリ構造] = useState({ nodes: [], links: [] });
  const [読み込み中, set読み込み中] = useState(true);
  const [エラー, setエラー] = useState(null);
  const 変更 = useFileChanges();
  const [選択中構造, set選択中構造] = useState('ファイルツリー');
  const [検索クエリ, set検索クエリ] = useState('');
  const [フィルター済みノード, setフィルター済みノード] = useState([]);
  const [フィルター済みリンク, setフィルター済みリンク] = useState([]);

  const ディレクトリ構造読み込み = useCallback(async () => {
    try {
      set読み込み中(true);
      if (選択されたシステム) {
        const データ = await fetchDirectoryStructure(選択されたシステム);
        const 変換済みデータ = transformApiResponse(データ.structure);
        setディレクトリ構造(変換済みデータ);
        setフィルター済みノード(変換済みデータ.nodes);
        setフィルター済みリンク(変換済みデータ.links);
      }
    } catch (err) {
      setエラー(err.message);
    } finally {
      set読み込み中(false);
    }
  }, [選択されたシステム]);

  useEffect(() => {
    if (選択されたシステム) {
      ディレクトリ構造読み込み();
    }
  }, [選択されたシステム, ディレクトリ構造読み込み]);

  useEffect(() => {
    if (変更.length > 0) {
      ディレクトリ構造読み込み();
    }
  }, [変更, ディレクトリ構造読み込み]);

  const ノード色取得 = useCallback((ノード) => {
    if (ノード.type === 'directory') {
      const 特殊ディレクトリ色 = {
        'exe_history': 'rgba(255, 99, 71, 0.8)',  // トマト
        'frontend': 'rgba(65, 105, 225, 0.8)',    // ロイヤルブルー
        'backend': 'rgba(50, 205, 50, 0.8)',      // ライムグリーン
        'middleware': 'rgba(255, 165, 0, 0.8)',   // オレンジ
        'docs': 'rgba(138, 43, 226, 0.8)',        // ブルーバイオレット
        'tests': 'rgba(255, 20, 147, 0.8)',       // ディープピンク
        'resources': 'rgba(0, 191, 255, 0.8)',    // ディープスカイブルー
        'database': 'rgba(255, 215, 0, 0.8)',     // ゴールド
        'logs': 'rgba(169, 169, 169, 0.8)',       // ダークグレー
        'locales': 'rgba(0, 250, 154, 0.8)',      // メディウムスプリンググリーン
        'meta': 'rgba(255, 215, 0, 1)'            // 純金色
      };
      return 特殊ディレクトリ色[ノード.name] || 'rgba(0, 150, 255, 0.8)';
    }
    const 拡張子 = ノード.name.split('.').pop().toLowerCase();
    switch (拡張子) {
      case 'js':
      case 'jsx':
        return 'rgba(255, 220, 0, 0.8)'; // JavaScript
      case 'ts':
      case 'tsx':
        return 'rgba(0, 122, 204, 0.8)'; // TypeScript
      case 'css':
      case 'scss':
        return 'rgba(0, 220, 255, 0.8)'; // スタイルシート
      case 'html':
        return 'rgba(255, 100, 0, 0.8)'; // HTML
      case 'json':
        return 'rgba(150, 150, 150, 0.8)'; // JSON
      case 'md':
        return 'rgba(100, 255, 100, 0.8)'; // Markdown
      case 'py':
        return 'rgba(255, 59, 48, 0.8)'; // Python（赤系統に変更）
      case 'rb':
        return 'rgba(255, 45, 85, 0.8)'; // Ruby（赤系統に変更）
      case 'php':
        return 'rgba(255, 69, 58, 0.8)'; // PHP（赤系統に変更）
      case 'java':
        return 'rgba(255, 105, 97, 0.8)'; // Java（赤系統に変更）
      case 'go':
        return 'rgba(255, 55, 95, 0.8)'; // Go（赤系統に変更）
      case 'rs':
        return 'rgba(255, 85, 85, 0.8)'; // Rust（赤系統に変更）
      case 'sql':
        return 'rgba(255, 99, 71, 0.8)'; // SQL（赤系統に変更）
      case 'sh':
      case 'bash':
        return 'rgba(255, 69, 0, 0.8)'; // シェルスクリプト（赤系統に変更）
      case 'yml':
      case 'yaml':
        return 'rgba(203, 23, 30, 0.8)'; // YAML
      case 'dockerfile':
        return 'rgba(255, 36, 0, 0.8)'; // Dockerfile（赤系統に変更）
      default:
        return 'rgba(200, 200, 200, 0.8)'; // その他
    }
  }, []);

  const クリック処理 = useCallback((ノード) => {
    if (fgRef.current) {
      const fg = fgRef.current;
      fg.centerAt(ノード.x, ノード.y, 1000);
      fg.zoom(4, 2000);
    }
    set選択中ノード(前の選択 => {
      const インデックス = 前の選択.findIndex(n => n.id === ノード.id);
      if (インデックス > -1) {
        return 前の選択.filter(n => n.id !== ノード.id);
      } else {
        return [...前の選択, ノード];
      }
    });
    onNodeClick(ノード);

    // ファイルの場合、周囲1リンク先を表示
    if (ノード.type === 'file') {
      const 関連ノード = new Set([ノード.id]);
      ディレクトリ構造.links.forEach(リンク => {
        if (リンク.source === ノード.id) 関連ノード.add(リンク.target);
        if (リンク.target === ノード.id) 関連ノード.add(リンク.source);
      });
      const 保持するノード = ディレクトリ構造.nodes.filter(n => 関連ノード.has(n.id));
      const 保持するリンク = ディレクトリ構造.links.filter(l => 
        関連ノード.has(l.source) && 関連ノード.has(l.target)
      );
      setフィルター済みノード(保持するノード);
      setフィルター済みリンク(保持するリンク);
    }
    // ディレクトリの場合、1つ上と下のすべての階層を表示
    else if (ノード.type === 'directory') {
      const 親パス = ノード.path.split('/').slice(0, -1).join('/');
      const 保持するノード = ディレクトリ構造.nodes.filter(n => 
        n.path.startsWith(親パス) || n.path === 親パス
      );
      const 保持するリンク = ディレクトリ構造.links.filter(l => 
        保持するノード.some(n => n.id === l.source) && 保持するノード.some(n => n.id === l.target)
      );
      setフィルター済みノード(保持するノード);
      setフィルター済みリンク(保持するリンク);
    }
  }, [onNodeClick, ディレクトリ構造]);

  const 検索処理 = useCallback((クエリ) => {
    set検索クエリ(クエリ);
    if (!クエリ) {
      setフィルター済みノード(ディレクトリ構造.nodes);
      setフィルター済みリンク(ディレクトリ構造.links);
    } else {
      const フィルター結果 = ディレクトリ構造.nodes.filter(ノード => 
        (ノード.name && ノード.name.toLowerCase().includes(クエリ.toLowerCase())) ||
        (ノード.path && ノード.path.toLowerCase().includes(クエリ.toLowerCase()))
      );
      setフィルター済みノード(フィルター結果);
      const 関連リンク = ディレクトリ構造.links.filter(リンク => 
        フィルター結果.some(n => n.id === リンク.source) && フィルター結果.some(n => n.id === リンク.target)
      );
      setフィルター済みリンク(関連リンク);
    }
  }, [ディレクトリ構造]);

  const フォースグラフ設定 = useMemo(() => ({
    graphData: { nodes: フィルター済みノード, links: フィルター済みリンク },
    nodeLabel: "name",
    nodeAutoColorBy: ノード色取得,
    nodeCanvasObject: (ノード, ctx, グローバルスケール) => {
      const ラベル = ノード.name;
      const フォントサイズ = ノード.type === 'directory' ? 14/グローバルスケール : 12/グローバルスケール;
      ctx.font = `${フォントサイズ}px Sans-Serif`;
      const テキスト幅 = ctx.measureText(ラベル).width;
      const 背景寸法 = [テキスト幅, フォントサイズ].map(n => n + フォントサイズ * 0.2);

      ctx.beginPath();
      ctx.arc(ノード.x, ノード.y, ノード.type === 'directory' ? 6 : 4, 0, 2 * Math.PI);
      ctx.fillStyle = ノード色取得(ノード);
      ctx.fill();

      if (選択中ノード.some(n => n.id === ノード.id) || ノード.name === 'meta') {
        const 基本発光半径 = ノード.type === 'directory' ? 8 : 6;
        const 時間 = performance.now() / 1000;
        const 発光半径 = 基本発光半径 + Math.sin(時間 * 1.5) * 2;
        
        if (isFinite(ノード.x) && isFinite(ノード.y)) {
          const グラデーション = ctx.createRadialGradient(ノード.x, ノード.y, 0, ノード.x, ノード.y, 発光半径);
          if (ノード.name === 'meta') {
            グラデーション.addColorStop(0, `rgba(255, 215, 0, ${0.8 + Math.sin(時間 * 1.5) * 0.2})`);
            グラデーション.addColorStop(0.5, `rgba(255, 215, 0, ${0.4 + Math.sin(時間 * 1.5) * 0.1})`);
            グラデーション.addColorStop(1, 'rgba(255, 215, 0, 0)');
          } else {
            グラデーション.addColorStop(0, `rgba(255, 255, 255, ${0.8 + Math.sin(時間 * 1.5) * 0.2})`);
            グラデーション.addColorStop(0.5, `rgba(255, 255, 255, ${0.4 + Math.sin(時間 * 1.5) * 0.1})`);
            グラデーション.addColorStop(1, 'rgba(255, 255, 255, 0)');
          }
          ctx.beginPath();
          ctx.arc(ノード.x, ノード.y, 発光半径, 0, 2 * Math.PI);
          ctx.fillStyle = グラデーション;
          ctx.fill();
        }

        ctx.beginPath();
        const 円の半径 = ノード.type === 'directory' ? 6 : 4;
        ctx.arc(ノード.x, ノード.y, 円の半径, 0, 2 * Math.PI);
        ctx.strokeStyle = ノード.name === 'meta' ? 'rgba(255, 215, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillText(ラベル, ノード.x, ノード.y + フォントサイズ * 1.5);

      ノード.__bckgDimensions = 背景寸法;
    },
    linkWidth: 1.4,
    linkDirectionalParticles: 2,
    linkDirectionalParticleWidth: 1,
    linkDirectionalParticleSpeed: 0.005,
    linkDirectionalParticleColor: () => 'rgba(255, 255, 255, 0.6)',
    linkColor: () => 'rgba(255, 255, 255, 0.1)',
    nodeCanvasObjectMode: () => 'after',
    onNodeClick: クリック処理,
    cooldownTicks: 200,
  }), [ノード色取得, クリック処理, 選択中ノード, フィルター済みノード, フィルター済みリンク]);

  if (!選択されたシステム) {
    return <div className="flex justify-center items-center h-full text-[#d4d4d4]">{t('システムディレクトリを選択してください')}</div>;
  }

  if (読み込み中) {
    return <div className="flex justify-center items-center h-full text-[#d4d4d4]">{t('ディレクトリ構造を読み込み中...')}</div>;
  }

  if (エラー) {
    return <div className="flex justify-center items-center h-full text-red-500">{t('エラー')}: {エラー}</div>;
  }

  return (
    <div className="h-[600px] border border-[#3c3c3c] rounded-md overflow-hidden bg-[#1e1e1e]">
      <div className="flex items-center justify-between mb-3 p-3">
        <h3 className="text-lg font-medium text-[#d4d4d4] font-sans">{t('プロジェクト構造')}</h3>
        <div className="flex space-x-2">
          {['ファイルツリー', 'ビジネス構造', '依存関係', 'データ構造', '類似性', '免疫システム', 'マルチメディア'].map((構造) => (
            <button
              key={構造}
              onClick={() => set選択中構造(構造)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                選択中構造 === 構造 ? 'bg-[#4a4a4a] text-white' : 'bg-[#2a2a2a] text-[#a0a0a0] hover:bg-[#3a3a3a]'
              }`}
            >
              {t(構造)}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-3 px-3">
        <input
          type="text"
          value={検索クエリ}
          onChange={(e) => 検索処理(e.target.value)}
          placeholder={t('ディレクトリ名またはファイル名を検索...')}
          className="w-full px-3 py-2 bg-[#2a2a2a] text-[#d4d4d4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a4a4a]"
        />
      </div>
      <ForceGraph2D
        ref={fgRef}
        {...フォースグラフ設定}
      />
      <div className="p-3 text-[#d4d4d4] max-h-[150px] overflow-y-auto">
        <h3 className="text-md font-medium mb-2">{t('最近の変更')}:</h3>
        <ul className="list-disc list-inside">
          {変更.slice(0, 10).map((変更, インデックス) => (
            <li key={インデックス} className="text-sm mb-1">
              {t(変更.type)}: {変更.path}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default FileStructure;