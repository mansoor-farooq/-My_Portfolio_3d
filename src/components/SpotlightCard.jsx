import React, { useRef, useState } from "react";
import { TH } from "../theme";
import { playHoverSound } from "../utils/audio";

export default function SpotlightCard({
  children,
  className = "",
  style = {},
  onClick,
  spotlightColor = "rgba(0, 245, 155, 0.18)",
  borderColor = "rgba(255, 255, 255, 0.08)",
  borderHoverColor = "rgba(0, 245, 155, 0.4)",
  as = "div",
  ...props
}) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    playHoverSound();
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const Component = as;

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        position: "relative",
        background: TH.card,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderRadius: 20,
        border: `1px solid ${borderColor}`,
        overflow: "hidden",
        boxShadow: `0 8px 32px ${TH.shadow}`,
        transition: "border-color 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease",
        ...style,
      }}
      className={className}
      {...props}
    >
      {/* Dynamic Specular Spotlight Follower */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          opacity: opacity,
          transition: "opacity 0.25s ease",
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      {/* Inner Content Layer */}
      <div style={{ position: "relative", zIndex: 2, height: "100%" }}>
        {children}
      </div>
    </Component>
  );
}
