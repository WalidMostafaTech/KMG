import api from "./api";

export const getAllGamesByService = async (service, search) => {
  const { data } = await api.get("/all-games-by-service", {
    params: {
      service,
      search,
    },
  });

  return data?.data || [];
};

export const getProductsByGameAndService = async (payload) => {
  const { data } = await api.get("/products/by-game-and-service", {
    params: {
      service: payload.service,
      game_id: payload.game_id,
      min_time: payload.min_time,
      max_time: payload.max_time,
      country_id: payload.country_id,
      platform_id: payload.platform_id,
    },
  });

  return data;
};

export const getProductsDetails = async (id) => {
  const { data } = await api.get(`/products/details/${id}`);
  return data?.data || {};
};
