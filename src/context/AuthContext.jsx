import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import { postSignin, postExchangeToken } from '../apis/auth';

export const AuthContext = createContext({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const { getItem: getAccessTokenFromStorage, setItem: setAccessTokenInStorage, removeItem: removeAccessTokenFromStorage } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  
  const { getItem: getRefreshTokenFromStorage, setItem: setRefreshTokenInStorage, removeItem: removeRefreshTokenFromStorage } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState(getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState(getRefreshTokenFromStorage());

  const login = async (signinData) => {
  try {
    const loginResponse = await postSignin(signinData);
    const code = loginResponse.data?.code;

    if (!code) {
      alert('로그인 실패: code가 없습니다.');
      return;
    }

    const tokenResponse = await postExchangeToken(code);

    const newRefreshToken = tokenResponse.data?.refreshToken;
    const newAccessToken = tokenResponse.data?.accessToken;
    const userRole = tokenResponse.data?.role;

    if (!newAccessToken || !newRefreshToken) {
      alert('토큰 발급 실패');
      return;
    }

    setAccessTokenInStorage(newAccessToken);
    setRefreshTokenInStorage(newRefreshToken);
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);

    if (userRole === 'ROLE_SEMI_USER') {
      alert('프로필 설정이 필요합니다!');
      window.location.href = '/profilesetting';
    } else {
      alert('로그인 성공');
      window.location.href = '/home';
    }
  } catch (error) {
    console.error('로그인 오류:', error);
    alert('로그인 실패');
  }
};
  const logout = () => {
    removeAccessTokenFromStorage();
    removeRefreshTokenFromStorage();
    setAccessToken(null);
    setRefreshToken(null);
    alert('로그아웃 되었습니다.');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext를 찾을 수 없습니다.');
  }
  return context;
};
