import api from "./api";

export const getSettings = async () => {
  const { data } = await api.get("/all-settings");
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
