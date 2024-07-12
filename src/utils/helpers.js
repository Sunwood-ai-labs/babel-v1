import { format, parseISO } from 'date-fns';
import { ja, enUS } from 'date-fns/locale';

// 日付フォーマット関数
export const formatDate = (date, formatStr = 'yyyy年MM月dd日', locale = 'ja') => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, formatStr, { locale: locale === 'ja' ? ja : enUS });
};

// 文字列の切り捨て関数
export const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};

// オブジェクトの深いコピーを作成する関数
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// 配列をシャッフルする関数
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// カラーコードをRGBA形式に変換する関数
export const hexToRGBA = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// ファイルサイズを人間が読みやすい形式に変換する関数
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// URLパラメータを解析する関数
export const parseQueryString = (queryString) => {
  const params = {};
  const queries = queryString.substring(1).split('&');
  for (let i = 0; i < queries.length; i++) {
    const [key, value] = queries[i].split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
  }
  return params;
};

// 和風のランダムな色を生成する関数
export const generateJapaneseColor = () => {
  const japaneseColors = [
    '#D9A62E', // 黄金
    '#C73E3A', // 朱色
    '#6A4C9C', // 江戸紫
    '#42602D', // 松葉色
    '#2EA9DF', // 空色
    '#8E354A', // 蘇芳
    '#005CAF', // 瑠璃色
    '#E87A90', // 薄紅
    '#00896C', // 青竹色
    '#B28FCE', // 藤色
  ];
  return japaneseColors[Math.floor(Math.random() * japaneseColors.length)];
};

// 文字列をスラッグ化する関数
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// 配列内の重複を削除する関数
export const removeDuplicates = (array) => {
  return [...new Set(array)];
};

// 指定された範囲内のランダムな整数を生成する関数
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};