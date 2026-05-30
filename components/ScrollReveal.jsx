'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, delay = 0, threshold = 0.1, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px', // Trigger slightly before it fully appears
      threshold,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once visible to maintain animation state
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  const delayStyle = delay ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div
      ref={elementRef}
      className={`reveal-hidden ${isVisible ? 'reveal-visible' : ''} ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
}
