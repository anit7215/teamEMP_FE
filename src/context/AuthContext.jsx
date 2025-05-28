import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import { postSignin } from '../apis/auth';

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
      const { data } = await postSignin(signinData);

      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        alert('로그인 성공');
        window.location.href = '/home';
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 실패');
    }
  };

  ;

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login }}>
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
