import { useRef, useState } from "react";
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

const ImageViewer = ({ open, onOpenChange, images, startIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="p-0 max-w-full! h-screen bg-black/95 border-none"
        onClick={() => onOpenChange(false)}
      >
        <DialogTitle className="hidden">Image Viewer</DialogTitle>
        <DialogDescription className="hidden" />

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
          <button onClick={() => onOpenChange(false)}>
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
            loading="lazy"
            src={images[currentIndex]}
            draggable={false}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              cursor: dragging ? "grabbing" : "grab",
            }}
            className="max-h-[90vh] select-none transition-transform object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewer;
