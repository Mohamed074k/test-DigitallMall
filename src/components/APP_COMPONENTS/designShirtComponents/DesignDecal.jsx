import React, { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function DesignDecal({
  position,
  normal,
  scale,
  src,
  text,
  textColor,
}) {
  // Handle texture loading for images
  const texture = useTexture(src || "/placeholder.png");

  // Handle text decals
  const textTexture = useMemo(() => {
    if (!text) return null;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 256;

    context.fillStyle = textColor || "#000000";
    context.font = "Bold 120px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return new THREE.CanvasTexture(canvas);
  }, [text, textColor]);

  const finalTexture = src ? texture : textTexture;
  if (!finalTexture || !position) return null;

  // ✅ SIMPLE FIX: Just use position without complex rotation
  return (
    <mesh position={position} scale={[scale, scale, 1]}>
      <planeGeometry args={[1, 1]} />

      <meshStandardMaterial
        map={finalTexture}
        transparent={true}
        depthTest={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
