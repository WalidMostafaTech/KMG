import { useEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCw, RotateCcw } from "lucide-react";

const ImageViewer = ({ open, image, onClose }) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (open) {
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [open]);

  if (!open || !image) return null;

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

  return (
    <div
      className="fixed inset-0 z-9999 bg-black/70 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Controls */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-3 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => setScale((s) => s + 0.2)}>
          <ZoomIn className="text-white" />
        </button>

        <button onClick={() => setScale((s) => Math.max(1, s - 0.2))}>
          <ZoomOut className="text-white" />
        </button>

        <button onClick={() => setRotation((r) => r - 90)}>
          <RotateCcw className="text-white" />
        </button>

        <button onClick={() => setRotation((r) => r + 90)}>
          <RotateCw className="text-white" />
        </button>

        <button onClick={onClose}>
          <X className="text-white" />
        </button>
      </div>

      {/* Image */}
      <div
        className="w-full h-full flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={image}
          draggable={false}
          onMouseDown={handleMouseDown}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[90vh] max-w-[90vw] select-none object-contain"
          style={{
            transform: `
              translate(${position.x}px, ${position.y}px)
              scale(${scale})
              rotate(${rotation}deg)
            `,
            cursor: dragging ? "grabbing" : "grab",
          }}
        />
      </div>
    </div>
  );
};

export default ImageViewer;
