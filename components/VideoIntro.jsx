'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/VideoIntro.module.css';

const CinematicLayer = dynamic(() => import('./CinematicLayer'), { ssr: false });

export default function VideoIntro({ videoSrc = '/hero-video.mp4' }) {
  const videoRef     = useRef(null);
  const bgVideoRef   = useRef(null);
  const heroRef      = useRef(null);
  const contentRef   = useRef(null);

  const [playing, setPlaying]   = useState(true);
  const [muted, setMuted]       = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [loaded, setLoaded]     = useState(false);

  // GSAP entrance
  useEffect(() => {
    let ctx;
    (async () => {
      const { gsap } = await import('gsap');
      const el = contentRef.current;
      if (!el) return;

      const tagline  = el.querySelector('[data-anim="tagline"]');
      const firstName = el.querySelector('[data-anim="firstname"]');
      const lastName  = el.querySelector('[data-anim="lastname"]');
      const role      = el.querySelector('[data-anim="role"]');
      const badges    = el.querySelectorAll('[data-anim="badge"]');
      const controls  = el.querySelectorAll('[data-anim="ctrl"]');

      ctx = gsap.context(() => {
        gsap.set([tagline, firstName, lastName, role, ...badges, ...controls], {
          opacity: 0,
          y: 40,
        });

        const tl = gsap.timeline({ delay: 0.6 });
        tl.to(tagline,   { opacity: 1, y: 0, duration: 1,   ease: 'power3.out' })
          .to(firstName, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.5')
          .to(lastName,  { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.75')
          .to(role,      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
          .to(badges,    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, '-=0.4')
          .to(controls,  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 }, '-=0.3');
      }, el);
    })();
    return () => ctx?.revert();
  }, [loaded]);

  // Auto-hide sound hint
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4500);
    return () => clearTimeout(t);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    const bg = bgVideoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); bg?.play(); setPlaying(true); }
    else          { v.pause(); bg?.pause(); setPlaying(false); }
  }, []);

const toggleMute = useCallback(() => {
  const v = videoRef.current;
  const bg = bgVideoRef.current;

  if (!v) return;

  const newMuted = !v.muted;

  v.muted = newMuted;

  if (bg) {
    bg.muted = newMuted;
  }

  setMuted(newMuted);

  if (!newMuted) {
    setShowHint(false);
  }
}, []);

  const scrollDown = useCallback(() => {
    const next = heroRef.current?.nextElementSibling;
    if (next) next.scrollIntoView({ behavior: 'smooth' });
    else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  const handleCanPlay = () => setLoaded(true);

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Ambient blurred background */}
      <video ref={bgVideoRef} className={styles.bgVideo}
        src={videoSrc} autoPlay loop muted playsInline preload="auto" />

      {/* Gradient overlays */}
      <div className={styles.gradientBottom} />
      <div className={styles.gradientTop} />
      <div className={styles.gradientLeft} />
      <div className={styles.gradientVignette} />

      {/* Main video */}
      <video ref={videoRef}
        className={`${styles.mainVideo} ${loaded ? styles.videoLoaded : ''}`}
        src={videoSrc} autoPlay loop muted playsInline preload="auto"
        onCanPlay={handleCanPlay} />

      {/* Three.js bokeh layer */}
      <CinematicLayer />

      {/* Hero content */}
      <div ref={contentRef} className={styles.content}>
        
        <div className={styles.innerGlassWrapper}>
          <div className={styles.inner}>

            <p data-anim="tagline" className={styles.tagline}>
              <span className={styles.taglineDot} />
              MCA Student &amp; Full-Stack Developer
            </p>

            <h1 className={styles.name}>
              <span data-anim="firstname" className={styles.firstName}>SEJAL</span>
              <span data-anim="lastname"  className={styles.lastName}>P</span>
            </h1>

            <p data-anim="role" className={styles.role}>
              Building intelligent full-stack applications at the intersection<br className={styles.br} />
              of AI, cloud, and modern web engineering.
            </p>

            {/* Skill badges */}
            <div className={styles.badgeRow}>
              {['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'React', 'AI'].map((s) => (
                <span key={s} data-anim="badge" className={styles.badge}>{s}</span>
              ))}
            </div>

            {/* Controls */}
            <div className={styles.controlsRow}>
              <button data-anim="ctrl" className={styles.glassBtn}
                onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
                {playing ? (
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
                    <rect x="2" y="1" width="4" height="12" rx="1"/>
                    <rect x="8" y="1" width="4" height="12" rx="1"/>
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M3 1.5l9 5.5-9 5.5V1.5z"/>
                  </svg>
                )}
                <span>{playing ? 'Pause' : 'Play'}</span>
              </button>

              <button data-anim="ctrl" className={styles.glassBtn}
                onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
                {muted ? (
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 5H5L8 2v10L5 9H2V5z"/>
                    <line x1="11" y1="5" x2="13" y2="9"/>
                    <line x1="13" y1="5" x2="11" y2="9"/>
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 5H5L8 2v10L5 9H2V5z"/>
                    <path d="M10 4.5c1.1 .9 1.1 4.1 0 5"/>
                    <path d="M11.5 3c2 1.7 2 6.3 0 8"/>
                  </svg>
                )}
                <span>{muted ? 'Unmute' : 'Mute'}</span>
              </button>

              <a data-anim="ctrl" className={`${styles.glassBtn} ${styles.glassBtnAccent}`}
                href="https://www.linkedin.com/in/sejalp007" target="_blank" rel="noopener noreferrer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sound hint */}
      <div className={`${styles.soundHint} ${showHint ? styles.soundHintVisible : ''}`}>
        <span className={styles.soundPulse} />
        Tap for sound
      </div>

      {/* Scroll indicator */}
      <button className={styles.scrollIndicator} onClick={scrollDown} aria-label="Scroll down">
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine}><span className={styles.scrollPulse} /></span>
      </button>
    </section>
  );
}
