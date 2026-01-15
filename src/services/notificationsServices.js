import api from "./api";

export const getNotifications = async () => {
  const { data } = await api.get("/custom-notifications");
  return data?.data || [];
};

export const readNotification = async (id) => {
  const { data } = await api.post(`/custom-notifications/mark-read/${id}`);
  return data?.data || null;
};
