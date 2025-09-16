import React, { useEffect, useRef, useState } from "react";
import DesignDecal from "./DesignDecal";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

function TShirtModel({
  color,
  selectedSize,
  placedItems,
  selectedDesign,
  onPlaceDesign,
}) {
  const { scene } = useGLTF("/models/tshirt.glb");
  const { camera, gl } = useThree();
  const [targetMesh, setTargetMesh] = useState(null);
  const sceneRef = useRef();
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  useEffect(() => {
    if (!scene) return;

    const sizeScale = {
      XS: 0.018,
      S: 0.019,
      M: 0.02,
      L: 0.021,
      XL: 0.022,
      XXL: 0.023,
    };

    scene.scale.set(
      sizeScale[selectedSize] || 0.02,
      sizeScale[selectedSize] || 0.02,
      sizeScale[selectedSize] || 0.02
    );

    let foundMesh = null;

    scene.traverse((child) => {
      if (child.isMesh && !foundMesh) {
        foundMesh = child;
        console.log("Using mesh:", child.name);
      }
    });

    if (foundMesh) {
      // ✅ TEMPORARILY MAKE MATERIAL SINGLE-SIDED FOR RAYCASTING
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            side: THREE.FrontSide, // Only front side visible
          });
        }
      });

      setTargetMesh(foundMesh);
    }
  }, [scene, color, selectedSize]);

  // ✅ SIMPLE & GUARANTEED FRONT FACE PLACEMENT
  useEffect(() => {
    if (!selectedDesign || !targetMesh) return;

    const handleClick = (event) => {
      event.stopPropagation();

      const rect = gl.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);

      // Get intersections - will now only hit front faces
      const intersects = raycasterRef.current.intersectObject(targetMesh, true);

      if (intersects.length > 0) {
        const intersect = intersects[0];
        const hitPoint = intersect.point.clone();

        console.log("Front face hit at:", hitPoint.toArray());

        if (onPlaceDesign) {
          onPlaceDesign(
            {
              position: hitPoint.toArray(),
              scale: 0.1,
            },
            selectedDesign
          );
        }
      }
    };

    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [selectedDesign, targetMesh, camera, gl, onPlaceDesign]);

  return (
    <group>
      <primitive ref={sceneRef} object={scene} position={[0, -0.6, 0]} />

      {/* Render decals */}
      {placedItems.map((design, i) => (
        <DesignDecal
          key={design.id || i}
          position={design.position}
          scale={design.scale || 0.1}
          src={design.type === "image" ? design.src : undefined}
          text={design.type === "text" ? design.text : undefined}
          textColor={design.type === "text" ? design.color : undefined}
        />
      ))}
    </group>
  );
}

export default TShirtModel;
