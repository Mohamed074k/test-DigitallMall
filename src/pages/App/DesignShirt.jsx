import React, { useState } from "react";
import { Info } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2canvas from "html2canvas";

import TShirtCanvas from "../../components/APP_COMPONENTS/designShirtComponents/TShirtCanvas";
import ControlsPanel from "../../components/APP_COMPONENTS/designShirtComponents/ControlsPanel";
import DesignLibrary from "../../components/APP_COMPONENTS/designShirtComponents/DesignLibrary";
import TextType from "../../components/APP_COMPONENTS/searhResultsComponents/TextType";

const DesignShirt = () => {
  const [color, setColor] = useState("#ffffff");
  const [designs, setDesigns] = useState([]);
  const [placedItems, setPlacedItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [style, setStyle] = useState("Regular");
  const [description, setDescription] = useState("");
  const [productType, setProductType] = useState("tshirt");

  const handleDrop = (e, side) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("design"));
    setPlacedItems([
      ...placedItems,
      { ...data, x: 100, y: 100, width: 80, height: 80, side },
    ]);
  };

  const handleProductTypeChange = (newType) => {
    setProductType(newType);
    setPlacedItems([]);
  };

  const resetAll = () => {
    setPlacedItems([]);
    setDesigns([]);
    setDescription("");
    setHeight("");
    setWeight("");
    setSelectedSize("M");
    setStyle("Regular");
    setColor("#ffffff");
  };

  const handleExport = async () => {
    const nodes = document.querySelectorAll(".tshirt-container");
    let idx = 0;
    for (const node of nodes) {
      const canvas = await html2canvas(node);
      const link = document.createElement("a");
      const fileName = `${productType}-${idx === 0 ? "front" : "back"}.png`;
      link.download = fileName;
      link.href = canvas.toDataURL("image/png");
      link.click();
      idx++;
    }
    toast.success("Designs downloaded successfully");
  };

  const handleSave = () => {
    const imagesArr = designs.filter((d) => d.type === "image").map((d) => d.src);
    const textsArr = designs
      .filter((d) => d.type === "text")
      .map((t) => ({
        text: t.text,
        color: t.color,
        size: t.fontSize,
      }));

    const result = {
      front: `${productType}-front`,
      back: `${productType}-back`,
      designs: imagesArr,
      texts: textsArr,
      productType,
      size: selectedSize,
      color,
      style,
      height,
      weight,
      description,
    };

    console.log("SAVE DATA:", result);
    toast.success("Design saved successfully");
    resetAll();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-[poppins]">
      <header className="pt-6 pb-6 text-center mb-4">
        <h1 className="text-4xl md:text-5xl !font-extrabold tracking-wider font-[Montserrat]">
          Design Your TShirt or Hoodie
        </h1>
        <TextType
          text={[
            "Turn your ideas into reality",
            "Create custom T-shirts and hoodies",
            "Express yourself with unique designs",
            "Your style, your rules",
          ]}
          className="font-bold font-['JetBrains_Mono'] "
          typingSpeed={65}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="_"
        />
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Instructions + Library Section */}
        <div className="lg:col-span-3 space-y-4">
          {/* 🔹 Instructions Section */}
          <div className="bg-gradient-to-r from-blue-100 to-green-50 text-gray-800 rounded-lg p-3.5 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Info size={13} className="text-blue-500 animate-bounce" />
              <h2 className="!font-bold !text-lg tracking-wide pt-1.5">
                Instructions
              </h2>
            </div>
            <ul className="list-disc list-inside text-sm space-y-2 leading-relaxed -ml-2">
              <li>
                Click the <span className="font-semibold">Add Design</span>{" "}
                button to upload an image. Drag it from the Library onto the
                T-shirt or Hoodie preview. You can move and resize it directly
                on the preview.
              </li>
              <li>
                You can also <span className="font-semibold">Add Text</span> ,
                drag it onto the product, and change its color the same way.
              </li>
              <li>
                Choose your preferred size, style, and color. Enter your height
                and weight, and write down any additional ideas or notes.
                <br />
                <br />
                <span className="font-semibold">
                  {" "}
                  The description is always important
                </span>{" "}
                it helps our designer understand exactly what’s on your mind.
              </li>
            </ul>
          </div>
          <DesignLibrary designs={designs} setDesigns={setDesigns} />
        </div>

        {/* Middle canvases */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div
            onDrop={(e) => handleDrop(e, "front")}
            onDragOver={(e) => e.preventDefault()}
            className="bg-white rounded-lg shadow p-2 flex flex-col"
          >
            <p className="text-center font-extrabold mb-2 text-lg">Front Side</p>
            <TShirtCanvas
              side="front"
              productType={productType}
              placedItems={placedItems.filter((i) => i.side === "front")}
              setPlacedItems={(newItems) =>
                setPlacedItems([...newItems, ...placedItems.filter((i) => i.side !== "front")])
              }
            />
          </div>

          <div
            onDrop={(e) => handleDrop(e, "back")}
            onDragOver={(e) => e.preventDefault()}
            className="bg-white rounded-lg shadow p-2 flex flex-col"
          >
            <p className="text-center font-extrabold mb-2 text-lg">Back Side</p>
            <TShirtCanvas
              side="back"
              productType={productType}
              placedItems={placedItems.filter((i) => i.side === "back")}
              setPlacedItems={(newItems) =>
                setPlacedItems([...newItems, ...placedItems.filter((i) => i.side !== "back")])
              }
            />
          </div>
        </div>

        {/* Controls Panel */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <ControlsPanel
            color={color}
            setColor={setColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            style={style}
            setStyle={setStyle}
            description={description}
            setDescription={setDescription}
            productType={productType}
            setProductType={handleProductTypeChange}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white p-3 !rounded-lg"
            >
              Save
            </button>
            <button
              onClick={handleExport}
              className="flex-1 bg-green-600 text-white p-3 !rounded-lg"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignShirt;
