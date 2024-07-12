import { jwtDecode } from 'jwt-decode';

// JWTトークンを保存するキー
const TOKEN_KEY = 'auth_token';

// ユーザーをログインさせる
export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// ユーザーをログアウトさせる
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// 現在のユーザーが認証されているかチェック
export const isAuthenticated = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

// ローカルストレージからトークンを取得
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// トークンが有効期限切れかチェック
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (e) {
    return true;
  }
};

// 現在のユーザー情報を取得
export const getCurrentUser = () => {
  try {
    const token = getToken();
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
};

// APIリクエスト用の認証ヘッダーを取得
export const getAuthHeader = () => {
  const token = getToken();
  if (token) {
    return { 'Authorization': `Bearer ${token}` };
  }
  return {};
};

// トークンを更新
export const refreshToken = async () => {
  try {
    const response = await fetch('/api/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (response.ok) {
      const { token } = await response.json();
      login(token);
      return true;
    }
    return false;
  } catch (error) {
    console.error('トークン更新エラー:', error);
    return false;
  }
};

// ユーザーの権限をチェック
export const hasPermission = (requiredPermission) => {
  const user = getCurrentUser();
  return user && user.permissions && user.permissions.includes(requiredPermission);
};

// 認証状態の変更を監視
export const addAuthStateListener = (callback) => {
  window.addEventListener('storage', (event) => {
    if (event.key === TOKEN_KEY) {
      callback(isAuthenticated());
    }
  });
};

// 多言語対応のエラーメッセージ
export const getAuthErrorMessage = (error, t) => {
  switch (error) {
    case 'invalid_credentials':
      return t('auth.error.invalidCredentials');
    case 'account_locked':
      return t('auth.error.accountLocked');
    case 'email_not_verified':
      return t('auth.error.emailNotVerified');
    default:
      return t('auth.error.unknown');
  }
};