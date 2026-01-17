import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  from: number;
  to: number;
}

// Icosahedron vertices
const createIcosahedron = (): { vertices: Point3D[]; edges: Edge[] } => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const a = 1;
  const b = 1 / phi;

  const vertices: Point3D[] = [
    { x: 0, y: b, z: -a },
    { x: b, y: a, z: 0 },
    { x: -b, y: a, z: 0 },
    { x: 0, y: b, z: a },
    { x: 0, y: -b, z: a },
    { x: -a, y: 0, z: b },
    { x: 0, y: -b, z: -a },
    { x: a, y: 0, z: -b },
    { x: a, y: 0, z: b },
    { x: -a, y: 0, z: -b },
    { x: b, y: -a, z: 0 },
    { x: -b, y: -a, z: 0 },
  ];

  const edges: Edge[] = [
    { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 6 }, { from: 0, to: 7 }, { from: 0, to: 9 },
    { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 7 }, { from: 1, to: 8 },
    { from: 2, to: 3 }, { from: 2, to: 5 }, { from: 2, to: 9 },
    { from: 3, to: 4 }, { from: 3, to: 5 }, { from: 3, to: 8 },
    { from: 4, to: 5 }, { from: 4, to: 8 }, { from: 4, to: 10 }, { from: 4, to: 11 },
    { from: 5, to: 9 }, { from: 5, to: 11 },
    { from: 6, to: 7 }, { from: 6, to: 9 }, { from: 6, to: 10 }, { from: 6, to: 11 },
    { from: 7, to: 8 }, { from: 7, to: 10 },
    { from: 8, to: 10 },
    { from: 9, to: 11 },
    { from: 10, to: 11 },
  ];

  return { vertices, edges };
};

const rotatePoint = (point: Point3D, angleX: number, angleY: number, angleZ: number): Point3D => {
  let { x, y, z } = point;

  // Rotate around X
  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);
  const y1 = y * cosX - z * sinX;
  const z1 = y * sinX + z * cosX;
  y = y1;
  z = z1;

  // Rotate around Y
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  const x2 = x * cosY + z * sinY;
  const z2 = -x * sinY + z * cosY;
  x = x2;
  z = z2;

  // Rotate around Z
  const cosZ = Math.cos(angleZ);
  const sinZ = Math.sin(angleZ);
  const x3 = x * cosZ - y * sinZ;
  const y3 = x * sinZ + y * cosZ;

  return { x: x3, y: y3, z: z };
};

const project = (point: Point3D, scale: number, offsetX: number, offsetY: number, perspective: number = 4): { x: number; y: number; depth: number } => {
  const factor = perspective / (perspective + point.z);
  return {
    x: point.x * scale * factor + offsetX,
    y: point.y * scale * factor + offsetY,
    depth: point.z,
  };
};

interface GeometricCoreProps {
  className?: string;
  intensity?: number;
  interactive?: boolean;
}

export const GeometricCore = ({ className = '', intensity = 1, interactive = true }: GeometricCoreProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!interactive) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, [interactive]);

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
    window.addEventListener('mousemove', handleMouseMove);

    const { vertices, edges } = createIcosahedron();

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      timeRef.current += 0.003;
      const time = timeRef.current;

      // Very slow base rotation + mouse influence
      const baseRotationY = time * 0.3;
      const baseRotationX = time * 0.15;
      
      const mouseInfluenceX = (mousePos.y - 0.5) * 0.3 * intensity;
      const mouseInfluenceY = (mousePos.x - 0.5) * 0.3 * intensity;

      const rotationX = baseRotationX + mouseInfluenceX;
      const rotationY = baseRotationY + mouseInfluenceY;
      const rotationZ = Math.sin(time * 0.5) * 0.1;

      // Transform and project vertices
      const scale = Math.min(rect.width, rect.height) * 0.28;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const projectedVertices = vertices.map(v => {
        const rotated = rotatePoint(v, rotationX, rotationY, rotationZ);
        return project(rotated, scale, centerX, centerY);
      });

      // Sort edges by average depth for proper rendering
      const sortedEdges = [...edges].sort((a, b) => {
        const depthA = (projectedVertices[a.from].depth + projectedVertices[a.to].depth) / 2;
        const depthB = (projectedVertices[b.from].depth + projectedVertices[b.to].depth) / 2;
        return depthA - depthB;
      });

      // Draw edges
      sortedEdges.forEach(edge => {
        const from = projectedVertices[edge.from];
        const to = projectedVertices[edge.to];
        
        const avgDepth = (from.depth + to.depth) / 2;
        const depthFactor = (avgDepth + 2) / 4; // Normalize depth to 0-1
        
        const alpha = 0.15 + depthFactor * 0.6;
        const lineWidth = 0.5 + depthFactor * 1.5;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        
        // Gradient based on depth
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, `hsla(38, 80%, 55%, ${alpha * intensity})`);
        gradient.addColorStop(1, `hsla(38, 60%, 45%, ${alpha * 0.7 * intensity})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
      });

      // Draw vertices
      projectedVertices.forEach((v, i) => {
        const depthFactor = (v.depth + 2) / 4;
        const radius = 2 + depthFactor * 4;
        const alpha = 0.3 + depthFactor * 0.7;

        // Outer glow
        const glowRadius = radius * 3;
        const glowGradient = ctx.createRadialGradient(v.x, v.y, 0, v.x, v.y, glowRadius);
        glowGradient.addColorStop(0, `hsla(38, 80%, 55%, ${alpha * 0.4 * intensity})`);
        glowGradient.addColorStop(1, 'hsla(38, 80%, 55%, 0)');
        
        ctx.beginPath();
        ctx.arc(v.x, v.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Core point
        ctx.beginPath();
        ctx.arc(v.x, v.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(38, 80%, 60%, ${alpha * intensity})`;
        ctx.fill();
      });

      // Draw subtle connecting field lines
      const fieldLineCount = 6;
      for (let i = 0; i < fieldLineCount; i++) {
        const angle = (time * 0.2 + (i / fieldLineCount) * Math.PI * 2);
        const radiusInner = scale * 0.3;
        const radiusOuter = scale * 1.2;
        
        const x1 = centerX + Math.cos(angle) * radiusInner;
        const y1 = centerY + Math.sin(angle) * radiusInner;
        const x2 = centerX + Math.cos(angle) * radiusOuter;
        const y2 = centerY + Math.sin(angle) * radiusOuter;

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, `hsla(38, 60%, 50%, ${0.1 * intensity})`);
        gradient.addColorStop(0.5, `hsla(38, 40%, 40%, ${0.05 * intensity})`);
        gradient.addColorStop(1, 'hsla(38, 40%, 40%, 0)');

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos, intensity, interactive, handleMouseMove]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      {/* Subtle ambient glow behind the structure */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsla(38, 80%, 55%, 0.08) 0%, transparent 50%)',
        }}
      />
    </motion.div>
  );
};

export default GeometricCore;
