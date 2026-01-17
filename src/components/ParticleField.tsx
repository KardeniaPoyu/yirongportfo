import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  direction?: 'radial' | 'upward' | 'horizontal';
  intensity?: number;
  active?: boolean;
}

export const ParticleField = ({ 
  className = '', 
  particleCount = 30, // Significantly reduced count
  direction = 'radial',
  intensity = 1,
  active = true
}: ParticleFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  const createParticle = useCallback((width: number, height: number): Particle => {
    const centerX = width / 2;
    const centerY = height / 2;
    
    let x, y, vx, vy;
    
    switch (direction) {
      case 'upward':
        x = Math.random() * width;
        y = height + 10;
        vx = (Math.random() - 0.5) * 0.2;
        vy = -(0.3 + Math.random() * 0.5);
        break;
      case 'horizontal':
        x = -10;
        y = Math.random() * height;
        vx = 0.3 + Math.random() * 0.5;
        vy = (Math.random() - 0.5) * 0.1;
        break;
      case 'radial':
      default:
        // Spawn near center, move outward
        const angle = Math.random() * Math.PI * 2;
        const startRadius = 50 + Math.random() * 100;
        x = centerX + Math.cos(angle) * startRadius;
        y = centerY + Math.sin(angle) * startRadius;
        const speed = 0.2 + Math.random() * 0.3;
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
    }

    return {
      x,
      y,
      vx,
      vy,
      size: 1 + Math.random() * 2,
      alpha: 0,
      life: 0,
      maxLife: 200 + Math.random() * 300,
    };
  }, [direction]);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const rect = canvas.getBoundingClientRect();
    particlesRef.current = Array.from({ length: particleCount }, () => 
      createParticle(rect.width, rect.height)
    );
    // Stagger initial life values
    particlesRef.current.forEach((p, i) => {
      p.life = (i / particleCount) * p.maxLife;
    });

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particlesRef.current.forEach((particle, index) => {
        // Update
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Fade in/out based on life
        const lifeProgress = particle.life / particle.maxLife;
        if (lifeProgress < 0.1) {
          particle.alpha = lifeProgress * 10;
        } else if (lifeProgress > 0.8) {
          particle.alpha = (1 - lifeProgress) * 5;
        } else {
          particle.alpha = 1;
        }

        // Reset if too old or out of bounds
        if (particle.life > particle.maxLife || 
            particle.x < -20 || particle.x > rect.width + 20 ||
            particle.y < -20 || particle.y > rect.height + 20) {
          particlesRef.current[index] = createParticle(rect.width, rect.height);
        }

        // Draw
        const alpha = particle.alpha * 0.4 * intensity;
        
        // Glow
        const glowSize = particle.size * 4;
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize
        );
        glowGradient.addColorStop(0, `hsla(40, 10%, 60%, ${alpha * 0.5})`);
        glowGradient.addColorStop(1, 'hsla(40, 10%, 60%, 0)');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(40, 20%, 70%, ${alpha})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active, particleCount, direction, intensity, createParticle]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ display: 'block' }}
    />
  );
};

export default ParticleField;
