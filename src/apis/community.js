// src/api/community.js
import { axiosInstance } from './axios';

export const fetchCommunityPosts = async () => {
  const response = await axiosInstance.get('/community');
  return response.data;
};
