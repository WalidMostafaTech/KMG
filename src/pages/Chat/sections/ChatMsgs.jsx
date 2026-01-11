import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  X,
  ZoomIn,
  ZoomOut,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ChatMsgs = ({ messages }) => {
  const containerRef = useRef(null);

  const images = messages.filter((m) => m.image).map((m) => m.image);

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const openImage = (img) => {
    setCurrentIndex(images.indexOf(img));
    resetTransform();
    setOpen(true);
  };

  const resetTransform = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const next = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((i) => i + 1);
      resetTransform();
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      resetTransform();
    }
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = images[currentIndex];
    link.download = "image";
    link.click();
  };

  return (
    <>
      {/* Messages */}
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
              {msg.text && <p>{msg.text}</p>}

              {msg.image && (
                <img
                  src={msg.image}
                  onClick={() => openImage(msg.image)}
                  className="rounded-lg max-h-60 cursor-pointer hover:opacity-90 mt-2"
                />
              )}

              <span className="text-[10px] text-white bg-black/10 px-2 py-1 rounded-lg w-fit">
                {msg.created_at}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Image Viewer */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="p-0 max-w-full! h-screen bg-black/95 border-none"
          onClick={() => setOpen(false)}
        >
          <DialogTitle className="hidden">Image Viewer</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>

          {/* Controls */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setScale((s) => s + 0.2)}>
              <ZoomIn className="text-white" />
            </button>
            <button onClick={() => setScale((s) => Math.max(1, s - 0.2))}>
              <ZoomOut className="text-white" />
            </button>
            <button onClick={downloadImage}>
              <Download className="text-white" />
            </button>
            <button onClick={() => setOpen(false)}>
              <X className="text-white" />
            </button>
          </div>
          {/* Prev / Next */}
          {currentIndex > 0 && (
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              <ChevronLeft className="text-white w-8 h-8" />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <ChevronRight className="text-white w-8 h-8" />
            </button>
          )}
          {/* Image */}
          <div
            className="w-full h-full flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              onClick={(e) => e.stopPropagation()}
              src={images[currentIndex]}
              onMouseDown={handleMouseDown}
              draggable={false}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor: dragging ? "grabbing" : "grab",
              }}
              className="max-h-[90vh] select-none transition-transform object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatMsgs;
