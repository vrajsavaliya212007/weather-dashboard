import api from "./axios";

export const getFavorites = async () => {
  const res = await api.get("/favorites");
  return res.data;
};

export const addFavorite = async (data) => {
  const res = await api.post("/favorites", data);
  return res.data;
};

export const deleteFavorite = async (id) => {
  const res = await api.delete(`/favorites/${id}`);
  return res.data;
};
