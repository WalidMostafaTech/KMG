import api from "./api";

export const getSettings = async () => {
  const { data } = await api.get("/settings");
  return data?.data || [];
};

export const getSearch = async (search) => {
  const { data } = await api.get("/games/search", {
    params: {
      search,
    },
  });
  return data?.data || [];
};

export const getCountries = async () => {
  const { data } = await api.get("/countries");
  return data?.data || [];
};

export const getPlatforms = async () => {
  const { data } = await api.get("/platforms");
  return data?.data || [];
};

export const getProductsMinutesRange = async () => {
  const { data } = await api.get("/products/minutes-range");
  return data?.data || [];
};

export const getFaq = async () => {
  const { data } = await api.get("/fqa");
  return data?.data || [];
};

export const getPurchaseSteps = async () => {
  const { data } = await api.get("/purchase-steps");
  return data?.data || [];
};

export const getFooter = async () => {
  const { data } = await api.get("/footer-and-social-links");
  return data?.data || {};
};

export const getContactUs = async (formData) => {
  const { data } = await api.post(`/contact`, formData);
  return data?.data || [];
};

export const getPolicies = async (type) => {
  const { data } = await api.get(`/policies`, {
    params: {
      type,
    },
  });
  return data?.data || [];
};

export const getUnreadCount = async (type) => {
  const { data } = await api.get(`/home/unread-count`, {
    params: {
      type,
    },
  });
  return data?.data || [];
};
