// src/apis/emergency.js
import { axiosInstance } from './axios'; // ✅ 공통 인스턴스 사용

// AED 정보 조회 API
export const fetchNearbyAeds = async ({ latitude, longitude }) => {
  try {
    const response = await axiosInstance.get('/api/emergency/aed', {
      params: {
        userLatitude: latitude,
        userLongitude: longitude,
      },
    });

    return response.data;
  } catch (error) {
    console.error('AED 정보 조회 실패:', error);
    throw error;
  }
};