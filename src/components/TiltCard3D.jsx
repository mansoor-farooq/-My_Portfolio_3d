import React, { useRef, useState } from "react";

export default function TiltCard3D({ children, style = {}, className = "", intensity = 12, glare = true, ...props }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const rotateX = isHovered ? -coords.y * intensity : 0;
  const rotateY = isHovered ? coords.x * intensity : 0;
  const glareX = (coords.x + 0.5) * 100;
  const glareY = (coords.y + 0.5) * 100;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? "translateZ(8px)" : "translateZ(0px)"}`,
          transition: isHovered ? "transform 80ms ease-out" : "transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          borderRadius: "inherit",
        }}
      >
        {children}

        {/* Dynamic Holographic Specular Glare */}
        {glare && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              pointerEvents: "none",
              background: isHovered
                ? `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(2, 132, 199, 0.18) 0%, rgba(255, 255, 255, 0.08) 25%, transparent 60%)`
                : "transparent",
              transition: isHovered ? "none" : "background 400ms ease",
              mixBlendMode: "overlay",
              zIndex: 10,
            }}
          />
        )}
      </div>
    </div>
  );
}
