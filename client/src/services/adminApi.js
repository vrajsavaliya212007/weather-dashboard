import api from "./axios";

export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const toggleUserRole = async (id) => {
  const response = await api.put(`/admin/users/${id}/toggle-role`);
  return response.data;
};

export const toggleUserStatus = async (id) => {
  const response = await api.put(`/admin/users/${id}/toggle-status`);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

export const getAdminAnalytics = async () => {
  const response = await api.get("/admin/analytics");
  return response.data;
};

export const sendBroadcastNotification = async (data) => {
  const response = await api.post("/admin/notifications/broadcast", data);
  return response.data;
};

export const getAdminNews = async () => {
  const response = await api.get("/admin/news");
  return response.data;
};

export const deleteAdminNews = async (id) => {
  const response = await api.delete(`/admin/news/${id}`);
  return response.data;
};

export const toggleNewsStatus = async (id) => {
  const response = await api.put(`/admin/news/${id}/toggle`);
  return response.data;
};
