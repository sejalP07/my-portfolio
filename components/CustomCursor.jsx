'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const requestRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device supports hover and is desktop size
    const isDesktop = window.innerWidth > 1024 && window.matchMedia('(pointer: fine)').matches;
    if (!isDesktop) return;

    setIsVisible(true);
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      // Traverse up to find clickable element
      let el = e.target;
      while (el && el !== document.body) {
        const tagName = el.tagName.toLowerCase();
        
        // Match buttons, links, copy triggers, etc.
        if (tagName === 'a' || tagName === 'button' || el.onclick || el.getAttribute('role') === 'button') {
          setIsHovered(true);
          const cursorTextAttr = el.getAttribute('data-cursor');
          if (cursorTextAttr) {
            setCursorText(cursorTextAttr);
          } else if (tagName === 'a' && el.href.startsWith('mailto:')) {
            setCursorText('MAIL');
          } else if (tagName === 'a' && el.href.startsWith('tel:')) {
            setCursorText('CALL');
          } else if (tagName === 'button' && el.innerText.toLowerCase().includes('copy')) {
            setCursorText('COPY');
          } else if (tagName === 'a' && el.target === '_blank') {
            setCursorText('VIEW');
          } else {
            setCursorText('');
          }
          return;
        }
        el = el.parentElement;
      }
      setIsHovered(false);
      setCursorText('');
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Eased trailing effect using requestAnimationFrame
    const updateTrail = () => {
      const dx = mouseRef.current.x - trailRef.current.x;
      const dy = mouseRef.current.y - trailRef.current.y;
      
      // Interpolate with spring speed
      trailRef.current.x += dx * 0.16;
      trailRef.current.y += dy * 0.16;

      setTrail({ x: trailRef.current.x, y: trailRef.current.y });
      requestRef.current = requestAnimationFrame(updateTrail);
    };

    requestRef.current = requestAnimationFrame(updateTrail);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Center dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: 'var(--accent-color)',
          borderRadius: '50%',
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'transform 0.08s ease-out, background-color 0.3s',
          mixBlendMode: 'difference',
        }}
      />
      
      {/* Trailing circle */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? (cursorText ? '54px' : '40px') : '24px',
          height: isHovered ? (cursorText ? '54px' : '40px') : '24px',
          border: cursorText ? 'none' : '1px solid var(--accent-color)',
          backgroundColor: cursorText 
            ? 'var(--accent-color)' 
            : isHovered 
              ? 'rgba(212, 175, 55, 0.08)' 
              : 'transparent',
          borderRadius: '50%',
          transform: `translate3d(${trail.x - (isHovered ? (cursorText ? 27 : 20) : 12)}px, ${trail.y - (isHovered ? (cursorText ? 27 : 20) : 12)}px, 0) scale(${isClicking ? 0.85 : 1})`,
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s, background-color 0.3s, transform 0.1s ease-out',
          boxShadow: isHovered && !cursorText ? '0 0 15px rgba(212, 175, 55, 0.2)' : 'none',
        }}
      >
        {cursorText && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            color: '#000',
            textTransform: 'uppercase',
            animation: 'fadeIn 0.2s ease',
          }}>
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
