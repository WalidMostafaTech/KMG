import ChatHeader from "./sections/ChatHeader";
import ChatMsgs from "./sections/ChatMsgs";
import ChatInput from "./sections/ChatInput";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMsgs, sendMsg } from "@/services/chatServices";

const Chat = () => {
  const queryClient = useQueryClient();

  const {
    data: messagesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get_msgs"],
    queryFn: getMsgs,
  });

  const sendMsgMutation = useMutation({
    mutationFn: sendMsg,
    onSuccess: () => {
      // Refresh messages after sending
      queryClient.invalidateQueries(["get_msgs"]);
    },
  });

  return (
    <section className="container py-4 h-[90vh]">
      <div className="mx-auto max-w-3xl h-full rounded-xl flex flex-col overflow-hidden card">
        {/* Header */}
        <ChatHeader />

        {/* Messages */}
        <ChatMsgs messages={messagesData?.items || []} isLoading={isLoading} />

        {/* Input */}
        <ChatInput
          sendMsgMutation={sendMsgMutation}
          isLoading={sendMsgMutation.isPending}
        />
      </div>
    </section>
  );
};

export default Chat;
