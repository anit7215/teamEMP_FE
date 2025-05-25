import { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { postExchangeToken } from "../../apis/auth"; 
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getUserRoleFromToken } from "../../utils/token"; 

const LoginSuccessPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    (async () => {
      try {
        const res = await postExchangeToken(code);
        console.log("응답 데이터:", res);

        const tokenData = res?.data;
        if (tokenData?.accessToken && tokenData?.refreshToken) {
          setAccessToken(tokenData.accessToken);
          setRefreshToken(tokenData.refreshToken);
           const role = getUserRoleFromToken(tokenData.accessToken);
            console.log("사용자 권한:", role);

            if (role === "ROLE_SEMI_USER") {
              window.location.href = "/profilesetting";
            } else {
              window.location.href = "/home";
            }
          } else {
            alert("토큰 발급 실패: accessToken 없음");
          }
      } catch (e) {
        alert("로그인 중 오류가 발생했습니다.");
        window.location.href = "/";
      }
    })();
  }
}, [setAccessToken, setRefreshToken]);

  return <div><LoadingSpinner /></div>;
};

export default LoginSuccessPage;
