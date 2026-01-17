import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AcademicVisualProps {
  className?: string;
}

export const AcademicVisual = ({ className = '' }: AcademicVisualProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
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

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      timeRef.current += 0.005;
      const time = timeRef.current;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxRadius = Math.min(rect.width, rect.height) * 0.4;

      // Draw expanding/contracting circles (like knowledge layers)
      for (let i = 0; i < 5; i++) {
        const phase = (time * 0.3 + i * 0.4) % (Math.PI * 2);
        const radius = maxRadius * 0.3 + Math.sin(phase) * maxRadius * 0.2;
        const alpha = 0.1 + Math.sin(phase) * 0.15;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(38, 80%, 55%, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw connecting lines (knowledge connections)
      const nodeCount = 8;
      const nodes: { x: number; y: number; phase: number }[] = [];
      
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2 + time * 0.2;
        const radius = maxRadius * 0.6 + Math.sin(time * 0.5 + i) * maxRadius * 0.1;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        nodes.push({ x, y, phase: time + i });
      }

      // Draw connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = Math.sqrt(
            Math.pow(nodes[i].x - nodes[j].x, 2) + 
            Math.pow(nodes[i].y - nodes[j].y, 2)
          );
          if (distance < maxRadius * 0.8) {
            const alpha = (1 - distance / (maxRadius * 0.8)) * 0.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `hsla(38, 60%, 50%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes (knowledge points)
      nodes.forEach((node, i) => {
        const pulse = Math.sin(node.phase * 2) * 0.5 + 0.5;
        const radius = 3 + pulse * 2;
        const alpha = 0.4 + pulse * 0.4;

        // Glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 3);
        glowGradient.addColorStop(0, `hsla(38, 80%, 55%, ${alpha * 0.3})`);
        glowGradient.addColorStop(1, 'hsla(38, 80%, 55%, 0)');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(38, 80%, 60%, ${alpha})`;
        ctx.fill();
      });

      // Draw central core (academic foundation)
      const corePulse = Math.sin(time * 1.5) * 0.3 + 0.7;
      const coreRadius = 12 + corePulse * 4;
      const coreAlpha = 0.6 + corePulse * 0.3;

      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius * 2);
      coreGradient.addColorStop(0, `hsla(38, 80%, 55%, ${coreAlpha})`);
      coreGradient.addColorStop(0.5, `hsla(38, 70%, 50%, ${coreAlpha * 0.5})`);
      coreGradient.addColorStop(1, 'hsla(38, 80%, 55%, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 2, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(38, 80%, 60%, ${coreAlpha})`;
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative aspect-square ${className}`}
    >
      <div className="absolute inset-0 bg-card border border-border rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />
        {/* Subtle ambient glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, hsla(38, 80%, 55%, 0.05) 0%, transparent 60%)',
          }}
        />
      </div>
    </motion.div>
  );
};

export default AcademicVisual;

