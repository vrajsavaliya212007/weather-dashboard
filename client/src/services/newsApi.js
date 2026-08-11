import api from "./axios";

export const getNews = async (params = {}) => {
  const response = await api.get("/news", {
    params,
  });
  return response.data;
};
