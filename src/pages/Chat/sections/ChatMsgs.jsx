import { useEffect, useRef, useState } from "react";
import ImageViewer from "@/components/common/ImageViewer";

const ChatMsgs = ({ messages }) => {
  const containerRef = useRef(null);

  const images = messages.filter((m) => m.image).map((m) => m.image);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const openImage = (img) => {
    setViewerIndex(images.indexOf(img));
    setViewerOpen(true);
  };

  const linkifyText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline wrap-break-word"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <>
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-2 py-4 space-y-3 msgs_container"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 space-y-2 ${
                msg.sender === "user"
                  ? "bg-primary text-white rounded-ee"
                  : "bg-muted text-white rounded-es"
              }`}
            >
              {msg.text && (
                <p className="wrap-break-word">{linkifyText(msg.text)}</p>
              )}

              {msg.image && (
                <img
                  src={msg.image}
                  onClick={() => openImage(msg.image)}
                  className="rounded-lg max-h-60 cursor-pointer hover:opacity-90 mt-2"
                />
              )}

              {msg.file && (
                <a
                  href={msg.file.url}
                  download={msg.file.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-black/20 px-3 py-2 rounded-lg text-sm hover:bg-black/30"
                >
                  📎
                  <span className="truncate max-w-[180px]">
                    {msg.file.name}
                  </span>
                </a>
              )}

              <span className="text-[10px] bg-black/10 px-2 py-1 rounded-lg">
                {msg.created_at}
              </span>
            </div>
          </div>
        ))}
      </div>

      <ImageViewer
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        images={images}
        startIndex={viewerIndex}
      />
    </>
  );
};

export default ChatMsgs;
