import { axiosInstance } from './axios';

export const postFeature = async ({ username, birthday,gender,address }) => {
  const { data } = await axiosInstance.post('/api/auth/semi/feature', { username, birthday,gender,address });
  return data;
};

export const editFeature = async ({ username, birthday,gender,address }) => {
  const { data } = await axiosInstance.patch("/api/auth/user/feature", { username, birthday,gender,address });
  return data;
}

export const addHealthTag = async (tagList) => {
    const { data } = await axiosInstance.post("/api/auth/semi/health-tag",tagList);
    return data;
};

export const deleteHealthTag = async (tagId) => {
  const { data } = await axiosInstance.delete(`/api/auth/semi/health-tag/${tagId}`);
  return data;
};

export const getMyHealthTag = async () => {
  const { data } = await axiosInstance.get("/api/auth/semi/health-tag");
  return data;
};

export const addHealthValue = async ({type, value}) => {
    const { data } = await axiosInstance.post("/api/auth/user/health",{type, value});
    return data;
};