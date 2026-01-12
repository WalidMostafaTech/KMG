import api from "./api";

export const sendOtpVerifyEmail = async (email) => {
  const { data } = await api.post("/auth/verify/resend-code", { email });
  return data?.data;
};

export const verifyEmail = async (payload) => {
  const { data } = await api.post("/auth/verify-account", payload);
  return data?.data;
};
