import { axiosInstance } from './axios';

export const createCalendarEvent = async (eventData) => {
  const { data } = await axiosInstance.post('/api/auth/user/calendar', eventData);
  return data;
};

export const updateCalendarEvent = async (eventId, eventData) => {
  const { data } = await axiosInstance.put(`/api/auth/user/calendar/${eventId}`, eventData);
  return data;
};

export const deleteCalendarEvent = async (eventId) => {
  await axiosInstance.delete(`/api/auth/user/calendar/${eventId}`);
};

export const getCalendarEvent = async (eventId) => {
  const { data } = await axiosInstance.get(`/api/auth/user/calendar/${eventId}`);
  return data;
};

export const getAllCalendarEvents = async () => {
  const { data } = await axiosInstance.get('/api/auth/user/calendar');
  return data;
};

export const getCalendarEventsByDate = async (date) => {
  const { data } = await axiosInstance.get('/api/auth/user/calendar/date', {
    params: { date },
  });
  return data;
};

export const updateCalendarEventPriority = async (eventId, priority) => {
  const { data } = await axiosInstance.put(`/api/auth/user/calendar/${eventId}/priority`, priority);
  return data;
};

export const createTreatmentSchedule = async (treatmentData) => {
  const { data } = await axiosInstance.post('/api/auth/user/treatment', treatmentData);
  return data;
};

export const updateTreatmentSchedule = async (treatmentId, treatmentData) => {
  const { data } = await axiosInstance.put(`/api/auth/user/treatment/${treatmentId}`, treatmentData);
  return data;
};

export const deleteTreatmentSchedule = async (treatmentId) => {
  await axiosInstance.delete(`/api/auth/user/treatment/${treatmentId}`);
};

export const createMedicalResult = async (eventId, medicalResultData) => {
  const { data } = await axiosInstance.post(`/api/auth/user/medical-results/${eventId}`, medicalResultData);
  return data;
};

export const getMedicalResult = async (eventId) => {
  const { data } = await axiosInstance.get(`/api/auth/user/medical-results/${eventId}`);
  return data;
};

export const updateMedicalResult = async (eventId, medicalResultData) => {
  const { data } = await axiosInstance.put(`/api/auth/user/medical-results/${eventId}`, medicalResultData);
  return data;
};

export const deleteMedicalResult = async (eventId) => {
  await axiosInstance.delete(`/api/auth/user/medical-results/${eventId}`);
};

export const uploadMedicalImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const { data } = await axiosInstance.post('/api/auth/user/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const getMedicalImage = async (imageId) => {
  const { data } = await axiosInstance.get(`/api/auth/user/images/${imageId}`);
  return data;
};

export const deleteMedicalImage = async (imageId) => {
  await axiosInstance.delete(`/api/auth/user/images/${imageId}`);
};

export const createMedication = async (eventId, medicationData) => {
  const { data } = await axiosInstance.post(`/api/auth/user/medications/${eventId}`, medicationData);
  return data;
};

export const getMedication = async (eventId) => {
  const { data } = await axiosInstance.get(`/api/auth/user/medications/${eventId}`);
  return data;
};

export const updateMedication = async (eventId, medicationData) => {
  const { data } = await axiosInstance.put(`/api/auth/user/medications/${eventId}`, medicationData);
  return data;
};

export const deleteMedication = async (eventId) => {
  await axiosInstance.delete(`/api/auth/user/medications/${eventId}`);
};