import { axiosInstance } from './axios';

// 캘린더 이벤트 생성
export const createCalendarEvent = async (eventData) => {
  const { data } = await axiosInstance.post('/api/auth/user/calendar', eventData);
  return data;
};

// 캘린더 이벤트 수정
export const updateCalendarEvent = async (eventData) => {
  const { data } = await axiosInstance.put('/api/auth/user/calendar', eventData);
  return data;
};

// 캘린더 이벤트 삭제
export const deleteCalendarEvent = async (eventId, verifyId) => {
  const { data } = await axiosInstance.delete(`/api/auth/user/calendar-events/${eventId}`, {
    params: { verifyId },
  });
  return data;
};

// 단일 캘린더 이벤트 조회
export const getCalendarEvent = async (eventId, verifyId) => {
  const { data } = await axiosInstance.get(`/api/auth/user/calendar-events/${eventId}`, {
    params: { verifyId },
  });
  return data;
};

// 특정 날짜의 캘린더 이벤트 조회
export const getCalendarEventsByDate = async (date) => {
  const { data } = await axiosInstance.get('/api/auth/user/calendar/date', {
    params: { date },
  });
  return data;
};

// 이벤트 ID로 조회 (verifyId 없이)
export const getCalendarEventById = async (eventId) => {
  const { data } = await axiosInstance.get(`/api/auth/user/calendar/${eventId}`);
  return data;
};
