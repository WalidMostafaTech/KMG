import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const ChatMsgs = ({ messages, isLoading, openViewer }) => {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const formatChatTime = (dateString) => {
    const date = new Date(dateString.replace(" ", "T"));

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
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

  const renderOrderCard = (order) => {
    if (!order) return null;

    const product = order.product;

    return (
      <div className="bg-black/20 rounded-lg p-3 space-y-2 mt-2">
        <div className="flex flex-col md:flex-row items-center gap-2">
          {product?.game_icon && (
            <div className="w-full h-24 md:w-10 md:h-10 rounded overflow-hidden">
              <img
                loading="lazy"
                src={product.game_icon}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm font-semibold max-w-xs">{product?.title}</p>
            <div className="text-xs text-white/70 flex flex-wrap items-center gap-1">
              <p>كود الطلب:</p>
              <span className="font-semibold wrap-break-word">
                {order.order_code}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="text-white/70 flex flex-wrap items-center gap-1">
            <p>السعر:</p>
            <span className="font-semibold wrap-break-word">
              {order.total_price}
            </span>
          </div>
          <span className={`px-2 py-1 font-semibold rounded-lg bg-accent/20`}>
            {order.status}
          </span>
        </div>

        {product?.platforms && product.platforms.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {product.platforms.map((platform) => (
              <img
                loading="lazy"
                key={platform.id}
                src={platform.icon}
                alt={platform.name}
                className="w-6 h-6 rounded"
                title={platform.name}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const isImageFile = (fileType) => {
    return fileType?.startsWith("image/");
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-end gap-3 px-2 py-4">
        <Skeleton className="h-20 w-1/4 rounded-xl" />
        <Skeleton className="h-30 w-1/2 rounded-xl" />
        <Skeleton className="h-40 w-2/3 rounded-xl" />
        <Skeleton className="h-20 w-1/4 rounded-xl" />
        <Skeleton className="h-30 w-1/2 rounded-xl" />
        <Skeleton className="h-40 w-2/3 rounded-xl" />
      </div>
    );
  }

  if (!messages || messages?.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-2 py-4">
        <p className="text-center">{t("chatMsgs.noMessages")}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-2 py-4 space-y-3 msgs_container"
    >
      {messages
        ?.slice()
        .reverse()
        .map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 space-y-2 ${
                msg.from === "user"
                  ? "bg-primary text-white rounded-ee"
                  : "bg-muted text-white rounded-es"
              }`}
            >
              {msg.message && (
                <p className="wrap-break-word">{linkifyText(msg.message)}</p>
              )}

              {/* Display file */}
              {msg.file_path && (
                <>
                  {isImageFile(msg.file_type) ? (
                    <img
                      loading="lazy"
                      src={msg.file_path}
                      alt={msg.file_name}
                      className="rounded-lg max-h-60 cursor-pointer hover:opacity-90 mt-2"
                      onClick={() => openViewer(msg.file_path)}
                    />
                  ) : (
                    <a
                      href={msg.file_path}
                      download={msg.file_name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-black/20 px-3 py-2 rounded-lg text-sm hover:bg-black/30"
                    >
                      📎
                      <span className="truncate max-w-[180px]">
                        {msg.file_name}
                      </span>
                      {msg.file_size && (
                        <span className="text-xs text-white/50">
                          ({(msg.file_size / 1024).toFixed(1)} KB)
                        </span>
                      )}
                    </a>
                  )}
                </>
              )}

              {/* Display order card */}
              {renderOrderCard(msg.order)}

              <span className="text-[10px] bg-black/10 px-2 py-1 rounded-lg block w-fit">
                {formatChatTime(msg.created_at)}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatMsgs;
