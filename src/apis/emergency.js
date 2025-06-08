// src/apis/emergency.js
import { axiosInstance } from './axios';

// AED 조회
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

    //디버깅용
    if (error.response) {
      console.error('응답 상태:', error.response.status);       // 500 같은 상태 코드
      console.error('응답 데이터:', error.response.data);        // 백엔드에서 준 에러 메시지
    } else if (error.request) {
      console.error('요청은 갔지만 응답 없음:', error.request);   // 네트워크 문제 등
    } else {
      console.error('기타 에러:', error.message);               // 설정 문제 등
    }

    throw error;
  }
};

// 통합 조회
export const fetchNearbyBoth = async ({ latitude, longitude }) => {
  try {
    const response = await axiosInstance.get('/api/emergency/both', {
      params: {
        userLatitude: latitude,
        userLongitude: longitude,
      },
    });

    return response.data;
  } catch (error) {
    console.error('통합 조회 실패:', error);

    // 디버깅용
    if (error.response) {
      console.error('응답 상태:', error.response.status);       // 500 같은 상태 코드
      console.error('응답 데이터:', error.response.data);        // 백엔드에서 준 에러 메시지
    } else if (error.request) {
      console.error('요청은 갔지만 응답 없음:', error.request);   // 네트워크 문제 등
    } else {
      console.error('기타 에러:', error.message);               // 설정 문제 등
    }

    throw error;
  }
};

// 응급실 조회
export const fetchNearbyHospitals = async ({ latitude, longitude }) => {
  try {
    const response = await axiosInstance.get('/api/emergency/room', {
      params: {
        userLatitude: latitude,
        userLongitude: longitude,
      },
    });

    return response.data;
  } catch (error) {
    console.error('응급실 정보 조회 실패:', error);

    // 디버깅용
    if (error.response) {
      console.error('응답 상태:', error.response.status);       // 500 같은 상태 코드
      console.error('응답 데이터:', error.response.data);        // 백엔드에서 준 에러 메시지
    } else if (error.request) {
      console.error('요청은 갔지만 응답 없음:', error.request);   // 네트워크 문제 등
    } else {
      console.error('기타 에러:', error.message);               // 설정 문제 등
    }

    throw error;
  }
};