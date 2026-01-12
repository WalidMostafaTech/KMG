import api from "./api";

export const sendOtp = async (email) => {
  const { data } = await api.post("/auth/forgot-password", { email });
  return data?.data;
};

export const resendOtp = async (email) => {
  const { data } = await api.post("/auth/resend-code", { email });
  return data?.data;
};

export const verifyOtp = async (payload) => {
  const { data } = await api.post("/auth/verify-reset-code", payload);
  return data?.data;
};

export const resetPassword = async (payload) => {
  const { data } = await api.post("/auth/reset-password", payload);
  return data?.data;
};
