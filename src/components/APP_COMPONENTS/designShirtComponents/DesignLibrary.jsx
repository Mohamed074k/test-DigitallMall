// DesignLibrary.jsx
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import CollapsibleSection from "./CollapsibleSection";
import TextModal from "./TextModal";

const DesignLibrary = ({ designs, setDesigns }) => {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);

  const clearLibrary = () => setDesigns([]);
  const removeItem = (idx) => setDesigns(designs.filter((_, i) => i !== idx));

  const handleAddText = (newTextObj) => {
    setDesigns([...designs, newTextObj]);
  };

  return (
    <>
      <CollapsibleSection title="Library" defaultCollapsed={true}>
        {/* Controls */}
        <div className="flex flex-col justify-center mb-2 gap-2">
          <div className="flex justify-between gap-2">
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="bg-green-500 hover:bg-green-700 duration-300 text-white px-2 py-2 rounded w-1/2"
            >
              Add Design
            </button>
            <button
              onClick={() => setIsTextModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-700 duration-300 text-white px-2 py-2 rounded w-1/2"
            >
              Add Text
            </button>
          </div>
          <button
            onClick={clearLibrary}
            className="bg-red-500 hover:bg-red-700 duration-300 text-white px-2 py-2 rounded"
          >
            Clear Library
          </button>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const src = URL.createObjectURL(file);
                setDesigns([...designs, { type: "image", src }]);
              }
            }}
          />
        </div>

        {/* Designs Grid */}
        <div className="border-2 border-dashed border-gray-300 mt-3 rounded-lg p-3 overflow-y-auto">
          {designs.length === 0 ? (
            <p className="text-center pt-3 text-gray-500 text-sm">
              Your library is empty..
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {designs.map((item, idx) => (
                <div
                  key={idx}
                  draggable
                  onDragStart={(e) => {
                    const itemWithSize = {
                      ...item,
                      width: item.width || 80,
                      height: item.height || 60,
                      fontSize: item.fontSize || 24,
                    };
                    e.dataTransfer.setData(
                      "design",
                      JSON.stringify(itemWithSize)
                    );
                  }}
                  className="relative border rounded py-2 px-1 flex items-center justify-center cursor-grab active:!cursor-grabbing hover:bg-gray-100"
                >
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt="design"
                      className="w-30 h-20 object-contain"
                    />
                  ) : (
                    <p
                      style={{
                        fontSize: item.fontSize || "1rem",
                        color: item.color || "#000",
                      }}
                      className="font-bold"
                    >
                      {item.text}
                    </p>
                  )}
                  <button
                    onClick={() => removeItem(idx)}
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* Text Modal */}
      <TextModal
        isOpen={isTextModalOpen}
        onClose={() => setIsTextModalOpen(false)}
        onSubmit={handleAddText}
      />
    </>
  );
};

export default DesignLibrary;
