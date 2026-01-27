import ChatHeader from "./sections/ChatHeader";
import ChatMsgs from "./sections/ChatMsgs";
import ChatInput from "./sections/ChatInput";
import { getMsgs, getNewMsgs, sendMsg } from "@/services/chatServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ImageViewer from "./sections/ImageViewer";

const Chat = () => {
  const [viewerImage, setViewerImage] = useState(null);
  const [scrollTrigger, setScrollTrigger] = useState(0);

  const openViewer = (imgUrl) => {
    setViewerImage(imgUrl);
  };

  const closeViewer = () => {
    setViewerImage(null);
  };

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["get_msgs"],
    queryFn: getMsgs,
    refetchOnWindowFocus: false,
  });

  const messages = data || [];

  const lastMessageId = messages.length ? messages[0].id : null;

  useQuery({
    queryKey: ["get_new_msgs", lastMessageId],
    queryFn: () => getNewMsgs(lastMessageId),
    enabled: !!lastMessageId,
    refetchInterval: 20000,
    refetchOnWindowFocus: false,
    onSuccess: (newMsgs) => {
      if (!newMsgs || newMsgs.length === 0) return;

      queryClient.setQueryData(["get_msgs"], (old = []) => [
        ...newMsgs,
        ...old,
      ]);

      setScrollTrigger((p) => p + 1);
    },
  });

  const sendMsgMutation = useMutation({
    mutationFn: sendMsg,

    onMutate: async (formData) => {
      await queryClient.cancelQueries(["get_msgs"]);

      const previousMessages = queryClient.getQueryData(["get_msgs"]) || [];

      const tempId = `temp-${Date.now()}`;

      const optimisticMsg = {
        id: tempId,
        from: "user",
        message: formData.get("message") || "",
        file_path: null,
        file_type: formData.get("file")?.type,
        created_at: new Date().toISOString(),
        pending: true,
        error: false,
        _formData: formData,
      };

      queryClient.setQueryData(["get_msgs"], (old = []) => [
        optimisticMsg,
        ...old,
      ]);

      setScrollTrigger((p) => p + 1);

      return { previousMessages, tempId };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["get_msgs"], (old = []) =>
        old.map((msg) =>
          msg.id === context.tempId
            ? { ...msg, pending: false, error: true }
            : msg,
        ),
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["get_msgs"]);
    },
  });

  const retrySend = (formData) => {
    sendMsgMutation.mutate(formData);
    setScrollTrigger((p) => p + 1);
  };

  return (
    <section className="container py-4 h-[90vh]">
      <div className="mx-auto max-w-3xl h-full rounded-xl flex flex-col overflow-hidden card">
        <ChatHeader />

        <ChatMsgs
          messages={messages}
          isLoading={isLoading}
          openViewer={openViewer}
          onRetry={retrySend}
          scrollTrigger={scrollTrigger}
        />

        <ChatInput
          sendMsgMutation={sendMsgMutation}
          isLoading={sendMsgMutation.isPending}
        />
      </div>

      <ImageViewer
        open={!!viewerImage}
        image={viewerImage}
        onClose={closeViewer}
      />
    </section>
  );
};

export default Chat;
