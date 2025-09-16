import React, { useState } from "react";
import { Rnd } from "react-rnd";

const TShirtCanvas = ({ side, productType, placedItems, setPlacedItems }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const getProductImage = () => {
    if (productType === "hoodie") {
      return side === "front"
        ? "/images/hoddie-front.png"
        : "/images/hoddie-back.png";
    }
    return side === "front"
      ? "/images/tshirt-front.png"
      : "/images/tshirt-back.png";
  };

  const handleDragStop = (idx, d) => {
    const updated = [...placedItems];
    updated[idx].x = d.x;
    updated[idx].y = d.y;
    setPlacedItems(updated);
  };

  const handleResizeStop = (idx, ref, position) => {
    const updated = [...placedItems];
    updated[idx] = {
      ...updated[idx],
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
      ...position,
    };
    setPlacedItems(updated);
  };

  return (
    <div
      className="relative w-full max-w-xs mx-auto flex items-center justify-center tshirt-container"
      onClick={() => setSelectedIdx(null)} // click outside → deselect
    >
      <img
        src={getProductImage()}
        alt={`${productType} ${side}`}
        className="w-full max-h-111 object-contain pointer-events-none"
      />

      {placedItems.map((item, idx) => {
        const isSelected = selectedIdx === idx;

        // لو العنصر صورة خلي فيه Rnd مع الإطار والريسايز
        if (item.type === "image") {
          return (
            <Rnd
              key={idx}
              size={{ width: item.width, height: item.height }}
              position={{ x: item.x, y: item.y }}
              onDragStop={(e, d) => handleDragStop(idx, d)}
              onResizeStop={(e, dir, ref, delta, pos) =>
                handleResizeStop(idx, ref, pos)
              }
              bounds="parent"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdx(idx);
              }}
              className="absolute !cursor-grab active:!cursor-grabbing"
              resizeHandleStyles={
                isSelected
                  ? {
                      bottomRight: {
                        width: 12,
                        height: 12,
                        background: "white",
                        border: "2px solid #000",
                        borderRadius: "50%",
                        right: -6,
                        bottom: -6,
                        cursor: "nwse-resize",
                      },
                      bottomLeft: {
                        width: 12,
                        height: 12,
                        background: "white",
                        border: "2px solid #000",
                        borderRadius: "50%",
                        left: -6,
                        bottom: -6,
                        cursor: "nesw-resize",
                      },
                      topRight: {
                        width: 12,
                        height: 12,
                        background: "white",
                        border: "2px solid #000",
                        borderRadius: "50%",
                        right: -6,
                        top: -6,
                        cursor: "nesw-resize",
                      },
                      topLeft: {
                        width: 12,
                        height: 12,
                        background: "white",
                        border: "2px solid #000",
                        borderRadius: "50%",
                        left: -6,
                        top: -6,
                        cursor: "nwse-resize",
                      },
                    }
                  : {}
              }
              style={{
                border: isSelected ? "2px dashed #007bff" : "none",
                background: "transparent",
              }}
              enableResizing={
                isSelected
                  ? {
                      topRight: true,
                      topLeft: true,
                      bottomRight: true,
                      bottomLeft: true,
                    }
                  : false
              }
              lockAspectRatio
            >
              <img
                src={item.src}
                alt="design"
                className="w-full h-full object-contain pointer-events-none"
              />
            </Rnd>
          );
        }

        // لو العنصر نص → خلّيه يتحرك بس يمين وشمال بدون إطار ولا resize
        return (
          <Rnd
            key={idx}
            size={{ width: "auto", height: "auto" }}
            position={{ x: item.x, y: item.y }}
            onDragStop={(e, d) => handleDragStop(idx, d)}
            bounds="parent"
            enableResizing={false}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIdx(null); // مافيش تحديد للنص
            }}
            className="absolute !cursor-grab active:!cursor-grabbing"
          >
            <p
              style={{ color: item.color, fontSize: item.fontSize }}
              className="font-bold drop-shadow pointer-events-none"
            >
              {item.text}
            </p>
          </Rnd>
        );
      })}
    </div>
  );
};

export default TShirtCanvas;
