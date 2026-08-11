import api from "./axios";

export const getSettings = async () => {
  const response = await api.get("/user/settings");
  return response.data;
};

export const updateSettings = async (data) => {
  const response = await api.put("/user/settings", data);
  return response.data;
};
