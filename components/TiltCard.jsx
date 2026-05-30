'use client';

import { useState, useRef } from 'react';

export default function TiltCard({ children, style = {}, maxTilt = 8, accentLine = false, hoverGlow = true }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });

    // Normalize coordinates from -0.5 to 0.5
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    // Calculate rotation angles
    setRotation({
      x: -normY * maxTilt,
      y: normX * maxTilt,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '2.2rem 2rem',
        background: 'rgba(255, 255, 255, 0.015)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(-8px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        borderColor: isHovered ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.05)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0, 0, 0, 0.55), 0 0 30px rgba(212, 175, 55, 0.05)' 
          : 'none',
        transition: isHovered 
          ? 'border-color 0.3s, box-shadow 0.4s' 
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s, box-shadow 0.6s',
        ...style,
      }}
    >
      {accentLine && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.6), transparent)'
        }} />
      )}

      {hoverGlow && isHovered && (
        <div style={{
          position: 'absolute',
          top: coords.y - 150,
          left: coords.x - 150,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      )}

      <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
}
