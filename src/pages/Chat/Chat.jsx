import ChatHeader from "./sections/ChatHeader";
import ChatMsgs from "./sections/ChatMsgs";
import ChatInput from "./sections/ChatInput";
import { getMsgs, sendMsg } from "@/services/chatServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ImageViewer from "./sections/ImageViewer";

const Chat = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [images, setImages] = useState([]);

  const openViewer = (imgUrl) => {
    setImages([imgUrl]); // array فيها صورة واحدة
    setStartIndex(0);
    setIsViewerOpen(true);
  };

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["get_msgs"],
    queryFn: getMsgs,
    refetchOnWindowFocus: false,
  });

  const messages = data || [];

  const sendMsgMutation = useMutation({
    mutationFn: sendMsg,
    onSuccess: () => {
      queryClient.invalidateQueries(["get_msgs"]);
    },
  });

  return (
    <section className="container py-4 h-[90vh]">
      <div className="mx-auto max-w-3xl h-full rounded-xl flex flex-col overflow-hidden card">
        <ChatHeader />

        <ChatMsgs
          messages={messages}
          isLoading={isLoading}
          openViewer={openViewer}
        />

        <ChatInput
          sendMsgMutation={sendMsgMutation}
          isLoading={sendMsgMutation.isPending}
        />

        <ImageViewer
          open={isViewerOpen}
          onOpenChange={setIsViewerOpen}
          images={images}
          startIndex={startIndex}
        />
      </div>
    </section>
  );
};

export default Chat;
