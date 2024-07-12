import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

// APIクライアントの作成
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// レスポンスインターセプター
apiClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    // 認証エラー時の処理
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

// GET リクエスト
export const get = async (url, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};

// POST リクエスト
export const post = async (url, data = {}) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    console.error('POST request failed:', error);
    throw error;
  }
};

// PUT リクエスト
export const put = async (url, data = {}) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    console.error('PUT request failed:', error);
    throw error;
  }
};

// DELETE リクエスト
export const del = async (url) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    console.error('DELETE request failed:', error);
    throw error;
  }
};

// SaaS一覧を取得
export const fetchSaaSList = () => get('/saas');

// パッケージ一覧を取得
export const fetchPackageList = () => get('/packages');

// プロジェクト情報を取得
export const fetchProjectInfo = (projectId) => get(`/projects/${projectId}`);

// タスクを作成
export const createTask = (projectId, taskData) => post(`/projects/${projectId}/tasks`, taskData);

// ファイルをアップロード
export const uploadFile = (projectId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return post(`/projects/${projectId}/files`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// チャットメッセージを送信
export const sendChatMessage = (projectId, message) => post(`/projects/${projectId}/chat`, { message });

// ディレクトリ構造を取得
export const fetchDirectoryStructure = async (pathType) => {
  try {
    const response = await fetch(`http://localhost:8000/directory_structure?path_type=${pathType}`);
    if (!response.ok) {
      throw new Error('ディレクトリ構造の取得に失敗しました');
    }
    return await response.json();
  } catch (error) {
    console.error('ディレクトリ構造の取得中にエラーが発生しました:', error);
    throw error;
  }
};

export default {
  get,
  post,
  put,
  del,
  fetchSaaSList,
  fetchPackageList,
  fetchProjectInfo,
  createTask,
  uploadFile,
  sendChatMessage,
  fetchDirectoryStructure,
};