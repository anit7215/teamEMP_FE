import { axiosInstance } from './axios';

export const postFamily = async ({ name }) => {
  const { data } = await axiosInstance.post('/api/auth/user/family', { name });
  return data;
};

export const joinFamily = async (code) => {
  const { data } = await axiosInstance.post("/api/auth/user/family/join", {code});
  return data;
}

export const deleteFamily = async () => {
  const { data } = await axiosInstance.delete("/api/auth/user/family");
  return data;
};

export const updateFamilyName = async (name) => {
  const { data } = await axiosInstance.patch("/api/auth/user/family/name", {name});
  return data;
}

export const getFamily = async () => {
  const { data } = await axiosInstance.get("/api/auth/user/family");
  return data;
};

export const exitFamily = async () => {
  const { data } = await axiosInstance.delete("/api/auth/user/family/exit");
  return data;
}