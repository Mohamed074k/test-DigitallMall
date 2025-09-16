import React from "react";
import CollapsibleSection from "./CollapsibleSection";

const ControlsPanel = ({
  color,
  setColor,
  selectedSize,
  setSelectedSize,
  height,
  setHeight,
  weight,
  setWeight,
  style,
  setStyle,
  description,
  setDescription,
  productType,
  setProductType, // This now uses the new handler from DesignShirt
}) => {
  const tshirtColors = [
    "#1f2937", // Black
    "#ffffff", // White
    "#4b5563", // Gray
    "#d1d5db", // Light Gray
    "#4d7c0f", // Olive
    "#1e3a8a", // Dark Blue
    "#fb3e48", // Red
    "#155dfc", // Blue
    "#8B4513", // Brown
    "#F5DEB3", // Beige/Khaki
    "#800020", // Burgundy
    "#89CFF0", // Dusty Blue
  ];

  // Map of color codes to friendly names
  const colorNames = {
    "#1f2937": "Black",
    "#ffffff": "White",
    "#4b5563": "Gray",
    "#d1d5db": "Light Gray",
    "#4d7c0f": "Olive",
    "#1e3a8a": "Dark Blue",
    "#fb3e48": "Red",
    "#155dfc": "Blue",
    "#8B4513": "Brown",
    "#F5DEB3": "Beige",
    "#800020": "Burgundy",
    "#89CFF0": "Dusty Blue",
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const styles = ["Comfy Wear", "Oversized", "Boxy Fit", "Regular"];

  return (
    <CollapsibleSection title="Controls">
      {/* Product Type Selector */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <p className="font-semibold mb-3">Product Type</p>
        <div className="flex gap-2">
          <button
            onClick={() => setProductType("tshirt")}
            className={`flex-1 px-3 py-2 !rounded-lg border ${
              productType === "tshirt" ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            T-shirt
          </button>
          <button
            onClick={() => setProductType("hoodie")}
            className={`flex-1 px-3 py-2 !rounded-lg border  ${
              productType === "hoodie" ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            Hoodie
          </button>
        </div>
      </div>

      <div className="mb-4 pb-4 border-b border-gray-200">
        <p className="font-semibold mb-3">Size</p>
        <div className="flex flex-wrap gap-1">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`px-3 py-1 !rounded-lg border !text-sm ${
                selectedSize === s ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 pb-4 border-b border-gray-200">
        <p className="font-semibold mb-3">Style</p>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full border rounded p-2 cursor-pointer"
        >
          {styles.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 pb-4 border-b border-gray-200">
        <p className="font-semibold mb-3">Color</p>
        <div className="flex flex-wrap !gap-4">
          {tshirtColors.map((c, idx) => (
            <div
              key={idx}
              onClick={() => setColor(c)}
              title={colorNames[c] || c} // <--- Tooltip name on hover
              className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all duration-200 ${
                color === c
                  ? "border-black opacity-50 relative"
                  : "border-gray-300 opacity-100"
              }`}
              style={{ backgroundColor: c }}
            >
              {color === c && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-black transform rotate-45 opacity-70"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="font-semibold mb-3">General Info</p>
      <div className="flex gap-2 pb-4">
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height"
          className="flex-1 w-1/2 border rounded p-2"
        />
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight"
          className="flex-1 w-1/2 border rounded p-2"
        />
      </div>
      <div className="">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Do you have any comments?"
          className="w-full border rounded-lg p-2 !text-sm !resize-none"
          rows="5"
        />
      </div>
    </CollapsibleSection>
  );
};

export default ControlsPanel;
