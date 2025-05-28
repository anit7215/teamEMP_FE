import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

// 전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지한다.
let refreshPromise = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 요청 인터셉터: 모든 요청 전 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 발생 시 refreshToken을 통해 토큰 갱신 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러면서 아직 재시도 하지 않은 요청일 경우 처리
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (originalRequest.url === "/api/token/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/";
        return Promise.reject(error);
      }

      // 재시도 플래그 설정
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          const refreshToken = getRefreshToken();

          const { data } = await axiosInstance.post("/api/token/refresh", {
            refresh: refreshToken,
          });

          const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
          const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          return data.data.accessToken;
        })()
          .catch(() => {
            const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
            removeAccessToken();
            removeRefreshToken();
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      return refreshPromise.then((newAccessToken) => {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance.request(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);
