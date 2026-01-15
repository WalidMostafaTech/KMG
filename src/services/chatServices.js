import api from "./api";

export const sendMsg = async (formData) => {
  const { data } = await api.post("/chats/send", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data?.data || {};
};

export const getMsgs = async () => {
  const { data } = await api.get(`/chats/messages`);
  return data?.data || { items: [] };
};
