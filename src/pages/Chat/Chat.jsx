import ChatHeader from "./sections/ChatHeader";
import ChatMsgs from "./sections/ChatMsgs";
import ChatInput from "./sections/ChatInput";
import { getMsgs, sendMsg } from "@/services/chatServices";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const Chat = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["get_msgs"],
      queryFn: getMsgs,
      getNextPageParam: (lastPage) => {
        return lastPage?.meta?.current_page < lastPage?.meta?.last_page
          ? lastPage.meta.current_page + 1
          : undefined;
      },
    });

  const messages = data?.pages?.flatMap((page) => page.items) || [];

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
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />

        <ChatInput
          sendMsgMutation={sendMsgMutation}
          isLoading={sendMsgMutation.isPending}
        />
      </div>
    </section>
  );
};

export default Chat;
