import api from "./api";

export const getAllGamesByService = async (service) => {
  const { data } = await api.get("/all-games-by-service", {
    params: { service },
  });
  return data?.data || [];
};

export const getProductsByGameAndService = async (payload) => {
  const { data } = await api.get("/products/by-game-and-service", {
    params: { service: payload.service, game_id: payload.game_id },
  });
  return data;
};

export const getProductsDetails = async (id) => {
  const { data } = await api.get(`/products/details/${id}`);
  return data?.data || {};
};
