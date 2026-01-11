import { useState } from "react";
import ChatHeader from "./sections/ChatHeader";
import ChatMsgs from "./sections/ChatMsgs";
import ChatInput from "./sections/ChatInput";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "admin",
      text: "أهلاً بيك 👋 لو محتاج أي مساعدة ابعتلي هنا",
      created_at: new Date().toLocaleTimeString(),
    },
    {
      id: 2,
      sender: "user",
      text: "تمام شكراً ❤️",
      created_at: new Date().toLocaleTimeString(),
    },
  ]);

  return (
    <section className="container py-4 h-[90vh]">
      <div className="mx-auto max-w-3xl h-full rounded-xl flex flex-col overflow-hidden card">
        {/* Header */}
        <ChatHeader />

        {/* Messages */}
        <ChatMsgs messages={messages} />

        {/* Input */}
        <ChatInput setMessages={setMessages} />
      </div>
    </section>
  );
};

export default Chat;
