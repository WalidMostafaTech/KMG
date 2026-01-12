import { useState } from "react";
import { Send, Image as ImageIcon, Paperclip } from "lucide-react";

const ChatInput = ({ setMessages }) => {
  const [input, setInput] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        image: imageUrl,
        created_at: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
          url: fileUrl,
        },
        created_at: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: input,
        created_at: new Date().toLocaleTimeString(),
      },
    ]);
    setInput("");
  };

  return (
    <div className="pt-3 border-t border-white/10 flex items-center gap-2">
      {/* Image */}
      <label className="cursor-pointer text-white/70 hover:text-white">
        <ImageIcon size={20} />
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </label>

      {/* File */}
      <label className="cursor-pointer text-white/70 hover:text-white">
        <Paperclip size={20} />
        <input type="file" hidden onChange={handleFileUpload} />
      </label>

      <input
        type="text"
        placeholder="اكتب رسالتك..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        className="flex-1 bg-[#2a2b30] text-white text-sm px-4 py-2 rounded-full outline-none"
      />

      <button
        onClick={sendMessage}
        className="bg-primary hover:bg-purple-700 text-white p-2 rounded-full"
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default ChatInput;
