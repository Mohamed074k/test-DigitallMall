// TextModal.jsx
import React, { useState } from "react";
import Modal from "../../Modal";

const fontSizes = [
  { label: "XXS", value: "0.625rem" },
  { label: "XS", value: "0.75rem" },
  { label: "S", value: "0.875rem" },
  { label: "M", value: "1rem" },
  { label: "L", value: "1.25rem" },
  { label: "XL", value: "1.5rem" },
  { label: "XXL", value: "2rem" },
];

const TextModal = ({ isOpen, onClose, onSubmit }) => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [fontSize, setFontSize] = useState("1rem");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit({ type: "text", text, color, fontSize });
    setText("");
    setColor("#000000");
    setFontSize("1rem");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Text"
      footer={
        <button
          onClick={handleSubmit}
          className="btn btn-dark text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      }
    >
      {/* Preview box */}
      <div className="mb-4 border rounded-lg p-4 bg-gray-50">
        <p style={{ color, fontSize }} className="text-center pt-3">
          {text || "Your preview will appear here"}
        </p>
      </div>

      <div className="flex gap-2 justify-center mb-4">
        {/* Text input */}
        <div className="flex flex-col  gap-2 justify-center w-2/3">
          <label className="text-sm font-bold text-gray-500">Text</label>
          <input
            type="text"
            placeholder="Enter your text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border rounded p-2 "
          />
        </div>
        {/* Color picker */}
        <div className="flex flex-col gap-2 justify-center w-1/3">
          <label className="text-sm font-bold text-gray-500">Font Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10.5 p-0 border rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Font size buttons */}
      <div className="flex flex-col mb-4 gap-2 justify-center">
        <label className="text-sm font-bold text-gray-500">Font Size</label>

        <div className="flex gap-2">
          {fontSizes.map((size) => (
            <button
              key={size.label}
              onClick={() => setFontSize(size.value)}
              className={`px-3 py-1 rounded border ${
                fontSize === size.value ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default TextModal;
