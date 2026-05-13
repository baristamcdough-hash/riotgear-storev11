"use client";

import { useState, useRef } from "react";

interface Product3DViewerProps {
  frontImage: string;
  backImage?: string;
  name: string;
}

// A) 3D Card Flip Effect
export function ProductCardFlip({ frontImage, backImage, name }: Product3DViewerProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full aspect-[4/5] cursor-pointer" style={{ perspective: "1000px" }} onClick={() => setIsFlipped(!isFlipped)}>
      <div className="relative w-full h-full transition-transform duration-700" style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
          <img src={frontImage} alt={`${name} front`} className="w-full h-full object-cover" />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] px-2 py-1 rounded">Tap to flip</div>
        </div>
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <img src={backImage || frontImage} alt={`${name} back`} className="w-full h-full object-cover" />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] px-2 py-1 rounded">Tap to flip back</div>
        </div>
      </div>
    </div>
  );
}

// C) 360 Spin Viewer - drag to rotate
interface SpinViewerProps {
  images: string[];
  name: string;
}

export function ProductSpinViewer({ images, name }: SpinViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastX = useRef(0);

  const handleStart = (clientX: number) => { setIsDragging(true); lastX.current = clientX; };
  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - lastX.current;
    if (Math.abs(delta) > 10) {
      setCurrentFrame((prev) => (prev + (delta > 0 ? 1 : -1) + images.length) % images.length);
      lastX.current = clientX;
    }
  };
  const handleEnd = () => setIsDragging(false);

  if (images.length <= 1) return <img src={images[0]} alt={name} className="w-full h-full object-cover" />;

  return (
    <div className="relative w-full aspect-[4/5] overflow-hidden cursor-grab active:cursor-grabbing select-none bg-gray-50"
      onMouseDown={(e) => handleStart(e.clientX)} onMouseMove={(e) => handleMove(e.clientX)} onMouseUp={handleEnd} onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)} onTouchMove={(e) => handleMove(e.touches[0].clientX)} onTouchEnd={handleEnd}>
      <img src={images[currentFrame]} alt={`${name} angle ${currentFrame + 1}`} className="w-full h-full object-cover" draggable={false} />
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <span className="bg-black/70 text-white text-[9px] px-2 py-1 rounded flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          Drag to rotate
        </span>
        <span className="bg-black/70 text-white text-[9px] px-2 py-1 rounded">{currentFrame + 1}/{images.length}</span>
      </div>
    </div>
  );
}

// B) 3D Model Viewer placeholder (ready for .glb files)
interface Model3DViewerProps {
  modelUrl?: string;
  fallbackImage: string;
  name: string;
}

export function Product3DModel({ modelUrl, fallbackImage, name }: Model3DViewerProps) {
  if (!modelUrl) {
    return (
      <div className="relative w-full aspect-[4/5]">
        <img src={fallbackImage} alt={name} className="w-full h-full object-cover absolute inset-0" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <svg className="w-12 h-12 text-white/80 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
          <p className="text-white text-xs font-bold">3D View Available</p>
          <p className="text-white/60 text-[9px] mt-0.5">Upload .glb model in admin</p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-full aspect-[4/5] bg-gray-100 flex items-center justify-center">
      <p className="text-xs text-gray-500">3D Model: {modelUrl}</p>
    </div>
  );
}
