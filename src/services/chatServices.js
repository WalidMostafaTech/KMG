import api from "./api";

export const sendMsg = async () => {
  const { data } = await api.post("/chats/send");

  return data?.data || {};
};

export const getMsgs = async () => {
  const { data } = await api.get(`/chats/messages`);
  return data?.data || [];
};
