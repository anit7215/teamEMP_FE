import { axiosInstance } from './axios';

/**
 * 주간 통계
 */
export const fetchWeeklyHealthData = async (verifyId, year, month, week, type, token) => {
  try {
    const response = await axiosInstance.get(
      `/api/auth/user/health/weekly/${verifyId}/${year}/${month}/${week}/${type}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('건강 데이터 불러오기 실패:', error);
    throw error;
  }
};

/**
 * 월간 통계
 */
export const fetchMonthlyHealthData = async (verifyId, year, month, type, token) => {
  try {
    const response = await axiosInstance.get(
      `/api/auth/user/health/monthly/${verifyId}/${year}/${month}/${type}`,
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
