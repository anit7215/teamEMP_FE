export const getUserRoleFromToken = (token) => {
  try {
    const base64Payload = token.split('.')[1]; // payload 부분 추출
    const jsonPayload = atob(base64Payload); // Base64 디코딩
    const payload = JSON.parse(jsonPayload); // JSON 파싱
    return payload.role; // 예: "ROLE_SEMI_USER", "ROLE_USER"
  } catch (e) {
    console.error('토큰 파싱 오류:', e);
    return null;
  }
};
