import { useEffect, useRef } from "react";

/**
 * ParticleBackground
 * 
 * Interactive background inspired by Vitraga.com:
 * - Micro-dash particles scattered across the section container in a jittered grid
 * - Minimal, architectural monochrome palette (near-black / graphite with subtle opacity)
 * - Radial repulsion field responding instantly to cursor movement
 * - Elastic spring-damper physics returning dashes to their home position and orientation
 * - Positioned absolutely within the Hero + IntegrationStrip container
 * - Full retina / high-DPI support with 60fps requestAnimationFrame loop
 */
export default function ParticleBackground({ className = "absolute inset-0 pointer-events-none z-0 overflow-hidden" }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Mouse state relative to container
    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
      radius: 140, // Repulsion zone
    };

    // Particle definition
    let particles = [];

    const initParticles = () => {
      particles = [];
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      if (width === 0 || height === 0) return;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);

      // Grid spacing for uniform, airy distribution
      const stepX = 52;
      const stepY = 52;
      const cols = Math.ceil(width / stepX) + 1;
      const rows = Math.ceil(height / stepY) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Add organic jitter
          const jitterX = (Math.random() - 0.5) * (stepX * 0.7);
          const jitterY = (Math.random() - 0.5) * (stepY * 0.7);
          const baseX = i * stepX + jitterX;
          const baseY = j * stepY + jitterY;

          // Dash length: 4.5px to 7.5px, strokeWidth: ~1.2px
          const length = 4.5 + Math.random() * 3;
          const strokeWidth = 1.2 + Math.random() * 0.3;
          const baseAngle = (Math.random() - 0.5) * Math.PI;

          // Sophisticated monochrome alphas (subtle near-black dashes)
          const alpha = 0.16 + Math.random() * 0.22;

          particles.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            vx: 0,
            vy: 0,
            baseAngle,
            angle: baseAngle,
            vAngle: 0,
            length,
            strokeWidth,
            alpha,
          });
        }
      }
    };

    initParticles();

    // Mouse listeners relative to container coordinates
    const handleMouseMove = (e) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        mouse.x = clientX - rect.left;
        mouse.y = clientY - rect.top;
        mouse.active = true;
      } else {
        mouse.active = false;
        mouse.x = -1000;
        mouse.y = -1000;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleTouchMove = (e) => {
      if (!container || !e.touches || e.touches.length === 0) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;

      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        mouse.x = clientX - rect.left;
        mouse.y = clientY - rect.top;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // ResizeObserver on container to guarantee exact dimensions
    let resizeObserver = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        initParticles();
      });
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", initParticles);
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const radius = mouse.radius;
      const radiusSq = radius * radius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Calculate distance to mouse
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < radiusSq && distSq > 0) {
              const dist = Math.sqrt(distSq);
              // Radial repulsion force
              const force = Math.pow(1 - dist / radius, 1.5) * 11;
              const nx = dx / dist;
              const ny = dy / dist;

              p.vx += nx * force;
              p.vy += ny * force;

              // Angular deflection towards push angle
              const pushAngle = Math.atan2(dy, dx);
              p.vAngle += (pushAngle - p.angle) * 0.08 * (1 - dist / radius);
            }
          }

          // Spring return to home position (Hooke's law + damping)
          const fx = (p.baseX - p.x) * 0.048;
          const fy = (p.baseY - p.y) * 0.048;
          p.vx = (p.vx + fx) * 0.86;
          p.vy = (p.vy + fy) * 0.86;
          p.x += p.vx;
          p.y += p.vy;

          // Angular spring return to base orientation
          const fa = (p.baseAngle - p.angle) * 0.04;
          p.vAngle = (p.vAngle + fa) * 0.86;
          p.angle += p.vAngle;
        }

        // Draw micro-dash
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.strokeStyle = `rgba(9, 9, 11, ${p.alpha})`;
        ctx.lineWidth = p.strokeWidth;
        ctx.lineCap = "square";
        ctx.beginPath();
        ctx.moveTo(-p.length / 2, 0);
        ctx.lineTo(p.length / 2, 0);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", initParticles);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
    >
      {/* Subtle radial ambient vignette inspired by Vitraga */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(244,244,245,0.7),rgba(255,255,255,0))]" />
      
      {/* Interactive 2D Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
}
