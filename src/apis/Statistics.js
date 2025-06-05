import { axiosInstance } from './axios';

/**
 * 주간 통계
 * @param {string} verifyId - 사용자 식별자
 * @param {number} year - 조회할 연도
 * @param {number} month - 조회할 월 (1~12)
 * @param {number} week - 조회할 주차 (1~5)
 * @param {string} type - 혈압, 혈당, 수면, 체중
 * @param {string} token - Bearer 액세스 토큰
 */
export const fetchWeeklyHealthData = async (verifyId, year, month, week, type) => {
  try {
    const response = await axiosInstance.get(
      `/api/auth/user/health/weekly/${verifyId}/${year}/${month}/${week}/${type}`,

    );
    return response.data;
  } catch (error) {
    console.error('건강 데이터 불러오기 실패:', error);
    throw error;
  }
};

/**
 * 월간 통계
 * @param {string} verifyId - 사용자 식별자
 * @param {number} year - 조회할 연도
 * @param {number} month - 조회할 월 (1~12)
 * @param {string} type - 혈압, 혈당, 수면, 체중
 * @param {string} token - Bearer 액세스 토큰
 */
export const fetchMonthlyHealthData = async (verifyId, year, month, type, token) => {
  try {
    const response = await axiosInstance.get(
      `/api/auth/user/health/monthly/${verifyId}/${year}/${month}/${type}`, // ✅ 주차별 요약용 월간 엔드포인트
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('월간 건강 데이터 불러오기 실패:', error);
    throw error;
  }
};