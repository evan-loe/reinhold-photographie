"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function TiltImage({ src, alt, className = "" }: TiltImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation based on mouse position
    const rotateX = (y - centerY) / centerY * -10; // Max 10 degrees
    const rotateY = (x - centerX) / centerX * 10;   // Max 10 degrees
    
    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className="relative group perspective-1000 px-16"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative transform-gpu"
        animate={{
          rotateX: mousePosition.x,
          rotateY: mousePosition.y,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative">
          {/* Main image */}
          <motion.img
            src={src}
            alt={alt}
            className={`rounded-2xl relative z-0 ${className}`}
            animate={{
              filter: isHovered ? "brightness(1.1) contrast(1.05)" : "brightness(1) contrast(1)",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Gradient overlay that moves with hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={{
              background: isHovered
                ? `radial-gradient(circle at ${((mousePosition.y + 10) / 20) * 100}% ${((mousePosition.x + 10) / 20) * 100}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)`
                : "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
            }}
            animate={{
              opacity: isHovered ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Shadow that enhances on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent z-5"
            animate={{
              opacity: isHovered ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.3 }}
          />

        </div>
      </motion.div>
    </motion.div>
  );
}
