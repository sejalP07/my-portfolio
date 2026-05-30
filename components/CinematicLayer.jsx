'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/CinematicLayer.module.css';

export default function CinematicLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animFrameId;
    let renderer, scene, camera;
    let particleSystem;
    let mouse = { x: 0, y: 0 };
    let targetCam = { x: 0, y: 0 };

    async function init() {
      const THREE = await import('three');

      const canvas = canvasRef.current;
      if (!canvas) return;

      // Renderer
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      // Scene & Camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // Particles
      const count = 180;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      const warm = [
        new THREE.Color(0xff8c42),
        new THREE.Color(0xffb347),
        new THREE.Color(0xffd700),
        new THREE.Color(0xffeaa0),
        new THREE.Color(0xffffff),
        new THREE.Color(0x6ec6ff),
      ];

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3]     = (Math.random() - 0.5) * 14;
        positions[i3 + 1] = (Math.random() - 0.5) * 8;
        positions[i3 + 2] = (Math.random() - 0.5) * 6;

        const c = warm[Math.floor(Math.random() * warm.length)];
        colors[i3]     = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;

        sizes[i] = Math.random() * 28 + 8;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Soft circular sprite texture
      const spriteCanvas = document.createElement('canvas');
      spriteCanvas.width = 64;
      spriteCanvas.height = 64;
      const ctx = spriteCanvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.35, 'rgba(255,255,255,0.6)');
      grad.addColorStop(0.7, 'rgba(255,255,255,0.12)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      const spriteTex = new THREE.CanvasTexture(spriteCanvas);

      const mat = new THREE.PointsMaterial({
        size: 0.18,
        map: spriteTex,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
      });

      // Override size per point using custom shader approach via material.onBeforeCompile
      mat.onBeforeCompile = (shader) => {
        shader.vertexShader = shader.vertexShader
          .replace('void main() {', 'attribute float size;\nvoid main() {')
          .replace('gl_PointSize = ', 'gl_PointSize = size * ');
      };

      particleSystem = new THREE.Points(geo, mat);
      scene.add(particleSystem);

      // Mouse parallax
      const onMouseMove = (e) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouseMove);

      // Resize
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      // Animation
      const posArr = geo.attributes.position.array;
      const initPos = Float32Array.from(posArr);
      let t = 0;

      const animate = () => {
        animFrameId = requestAnimationFrame(animate);
        t += 0.0008;

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          posArr[i3]     = initPos[i3]     + Math.sin(t * 0.7 + i * 0.3) * 0.18;
          posArr[i3 + 1] = initPos[i3 + 1] + Math.cos(t * 0.5 + i * 0.4) * 0.14;
          posArr[i3 + 2] = initPos[i3 + 2] + Math.sin(t * 0.4 + i * 0.2) * 0.08;
        }
        geo.attributes.position.needsUpdate = true;

        // Smooth parallax
        targetCam.x += (mouse.x * 0.3 - targetCam.x) * 0.04;
        targetCam.y += (mouse.y * 0.2 - targetCam.y) * 0.04;
        camera.position.x = targetCam.x;
        camera.position.y = targetCam.y;
        camera.lookAt(0, 0, 0);

        // Slow rotation
        particleSystem.rotation.y = t * 0.04;
        particleSystem.rotation.x = t * 0.015;

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
      };
    }

    const cleanup = init();

    return () => {
      cancelAnimationFrame(animFrameId);
      cleanup.then((fn) => fn && fn());
      if (renderer) {
        renderer.dispose();
        particleSystem?.geometry?.dispose();
        particleSystem?.material?.dispose();
      }
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
