// helpers.js

import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';

// 日付をフォーマットする関数
export const formatDate = (dateString, formatString = 'yyyy年MM月dd日 HH:mm') => {
  const date = parseISO(dateString);
  return format(date, formatString, { locale: ja });
};

// 文字列を省略する関数
export const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};

// オブジェクトの深いコピーを作成する関数
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// 配列をシャッフルする関数
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// カラーコードをRGBA形式に変換する関数
export const hexToRGBA = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// ファイルサイズを人間が読みやすい形式に変換する関数
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// URLからクエリパラメータを取得する関数
export const getQueryParams = (url) => {
  const params = {};
  const searchParams = new URLSearchParams(new URL(url).search);
  for (const [key, value] of searchParams) {
    params[key] = value;
  }
  return params;
};

// 和風のランダムな色を生成する関数
export const generateJapaneseColor = () => {
  const japaneseColors = [
    '#D9A62E', // 山吹色
    '#D05A6E', // 朱色
    '#5A8F7B', // 青竹色
    '#7B90D2', // 藤色
    '#9B6E23', // 黄土色
    '#2E5C6E', // 藍色
    '#E16B8C', // 桃色
    '#86A697', // 青磁色
  ];
  return japaneseColors[Math.floor(Math.random() * japaneseColors.length)];
};

// 文字列をスラッグ化する関数
export const slugify = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// 配列内の要素の出現回数をカウントする関数
export const countOccurrences = (arr) => {
  return arr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
};

// 指定された範囲内のランダムな整数を生成する関数
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};