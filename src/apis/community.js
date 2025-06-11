// src/api/community.js
import { axiosInstance } from './axios';

export const fetchCommunityPosts = async () => {
  const response = await axiosInstance.get('/community');
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axiosInstance.post('/community/createPost', postData);
  return response.data;
}

export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`/community/delete/${postId}`);
  return response.data;
}

export const updatePost = async (postId, postData) => {
  const response = await axiosInstance.patch(`/community/patch/${postId}`, postData);
  return response.data;
}

export const addLike = async (postId) => {
  const response = await axiosInstance.post(`/community/${postId}/like`);
  return response.data;
}

export const addComment = async (postId, commentData) => {
  const response = await axiosInstance.post(`/community/${postId}/comments`, commentData);
  return response.data;
} 

export const deleteComment = async (postId, commentId) => {
  const response = await axiosInstance.delete(`/community/${postId}/comments/${commentId}`);
  return response.data;
}
