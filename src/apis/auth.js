import { axiosInstance } from './axios';

// 회원가입
export const postSignup = async (body) => {
  const { data } = await axiosInstance.post("/api/register", body);
  return data;
};

// 로그인
export const postSignin = async (body) => {
  const { data } = await axiosInstance.post("/api/login", body);
  return data;
};

// 임시 코드로 토큰 발급
export const postExchangeToken = async (code) => {
  const { data } = await axiosInstance.post(`/api/token/exchange?code=${code}`);
  return data;
};

// 리프레시 토큰으로 새 토큰 발급
export const postRefreshToken = async (refreshToken) => {
  const { data } = await axiosInstance.post("/api/token/refresh", {
    refresh: refreshToken,
  });
  return data;
};
