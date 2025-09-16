import React, { useEffect, useRef, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TShirtModel from "./TShirtModel";

export default function TShirt3D({
  color,
  selectedSize,
  placedItems,
  onDropItem,
  // ✅ Added props for click-to-apply feature
  selectedDesign,
  onPlaceDesign,
}) {
  const wrapperRef = useRef(null);
  const [controlsEnabled, setControlsEnabled] = useState(true);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("application/json");
      if (data) {
        try {
          const item = JSON.parse(data);
          const enriched = {
            ...item,
            id: item.id ?? Date.now() + Math.floor(Math.random() * 1000),
            position: item.position ?? [0, 0.2, 0.15],
            scale: item.scale ?? (item.type === "text" ? 0.06 : 0.05),
          };
          console.log("Dropped item on 3D area:", enriched);
          if (typeof onDropItem === "function") onDropItem(enriched);
        } catch (err) {
          console.error("Failed to parse dropped data", err);
        }
      }
    };

    wrapper.addEventListener("dragover", handleDragOver);
    wrapper.addEventListener("drop", handleDrop);

    const canvas = wrapper.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("dragover", handleDragOver);
      canvas.addEventListener("drop", handleDrop);
    }

    return () => {
      wrapper.removeEventListener("dragover", handleDragOver);
      wrapper.removeEventListener("drop", handleDrop);
      if (canvas) {
        canvas.removeEventListener("dragover", handleDragOver);
        canvas.removeEventListener("drop", handleDrop);
      }
    };
  }, [onDropItem]);

  // ✅ Toggle OrbitControls based on selectedDesign
  useEffect(() => {
    setControlsEnabled(!selectedDesign);
  }, [selectedDesign]);

  return (
    <div
      ref={wrapperRef}
      style={{ width: "100%", height: "80vh", pointerEvents: "auto" }}
    >
      <Canvas
        style={{ width: "100%", height: "100%", background: "#f9f9f9" }}
        camera={{ position: [0, 1, 0.9], fov: 45 }}
      >
        <ambientLight intensity={0.8} />
        <hemisphereLight
          skyColor={"#ffffff"}
          groundColor={"#cccccc"}
          intensity={0.9}
        />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />
        <directionalLight position={[-2, 2, -2]} intensity={0.8} />

        <Suspense fallback={null}>
          <TShirtModel
            color={color}
            selectedSize={selectedSize}
            placedItems={placedItems}
            // ✅ Added props for click-to-apply feature
            selectedDesign={selectedDesign}
            onPlaceDesign={onPlaceDesign}
          />
        </Suspense>

        <OrbitControls
          target={[0, 0.5, 0]}
          enablePan={false}
          enableZoom={true}
          minDistance={0.8}
          maxDistance={6}
          // ✅ Disable controls when a design is selected
          enabled={controlsEnabled}
        />
      </Canvas>
    </div>
  );
}
