// src/api/community.js
import { axiosInstance } from './axios';

//게시글 조회
export const fetchCommunityPosts = async () => {
  const response = await axiosInstance.get('/community');
  return response.data;
};

//게시글 등록
export const postCommunityPost = async (postData, accessToken) => {
  const response = await axiosInstance.post('/posts', postData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

//게시글 상세 조회
export const fetchPostDetail = async (postId, accessToken) => {
  const response = await axiosInstance.get(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
