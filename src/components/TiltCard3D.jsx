import React, { useRef, useEffect } from "react";

export default function TiltCard3D({ children, style = {}, className = "", intensity = 10, glare = true, ...props }) {
  const cardRef = useRef(null);
  const innerRef = useRef(null);
  const glareRef = useRef(null);
  const rafId = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !innerRef.current) return;
    
    // Cancel any pending RAF for maximum responsiveness
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current || !innerRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const rotateX = -y * intensity;
      const rotateY = x * intensity;

      innerRef.current.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`;

      if (glare && glareRef.current) {
        const glareX = ((x + 0.5) * 100).toFixed(1);
        const glareY = ((y + 0.5) * 100).toFixed(1);
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(2, 132, 199, 0.16) 0%, rgba(255, 255, 255, 0.08) 25%, transparent 60%)`;
      }
    });
  };

  const handleMouseEnter = () => {
    if (innerRef.current) {
      innerRef.current.style.transition = "transform 80ms ease-out";
    }
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (innerRef.current) {
      innerRef.current.style.transition = "transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1)";
      innerRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
    if (glare && glareRef.current) {
      glareRef.current.style.background = "transparent";
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

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
        willChange: "transform",
        ...style,
      }}
      {...props}
    >
      <div
        ref={innerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transition: "transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          borderRadius: "inherit",
          willChange: "transform",
        }}
      >
        {children}

        {/* Dynamic Holographic Specular Glare (Direct DOM, 0 Re-renders) */}
        {glare && (
          <div
            ref={glareRef}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              pointerEvents: "none",
              background: "transparent",
              mixBlendMode: "overlay",
              zIndex: 10,
              transition: "background 300ms ease",
            }}
          />
        )}
      </div>
    </div>
  );
}
