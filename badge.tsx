import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

interface Spark {
  element: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

interface ElectricSparksProps {
  className?: string;
  sparkCount?: number;
  triggerOnHover?: boolean;
  autoSpark?: boolean;
  sparkInterval?: number;
}

export function ElectricSparks({
  className = '',
  sparkCount = 15,
  triggerOnHover = true,
  autoSpark = true,
  sparkInterval = 2000,
}: ElectricSparksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationRef = useRef<number | null>(null);

  const createSpark = useCallback((x: number, y: number) => {
    if (!containerRef.current) return;

    const spark = document.createElement('div');
    spark.className = 'spark-particle';
    
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 4;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    
    containerRef.current.appendChild(spark);

    const sparkObj: Spark = {
      element: spark,
      x,
      y,
      vx,
      vy,
      life: 1,
      maxLife: 0.5 + Math.random() * 0.5,
    };

    sparksRef.current.push(sparkObj);

    gsap.to(spark, {
      scale: 0,
      opacity: 0,
      duration: sparkObj.maxLife,
      ease: 'power2.out',
      onComplete: () => {
        spark.remove();
        sparksRef.current = sparksRef.current.filter(s => s !== sparkObj);
      },
    });
  }, []);

  const createSparkBurst = useCallback((centerX: number, centerY: number) => {
    for (let i = 0; i < sparkCount; i++) {
      const offsetX = (Math.random() - 0.5) * 100;
      const offsetY = (Math.random() - 0.5) * 100;
      setTimeout(() => {
        createSpark(centerX + offsetX, centerY + offsetY);
      }, i * 30);
    }
  }, [sparkCount, createSpark]);

  useEffect(() => {
    if (!autoSpark || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const interval = setInterval(() => {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      createSparkBurst(x, y);
    }, sparkInterval);

    return () => clearInterval(interval);
  }, [autoSpark, sparkInterval, createSparkBurst]);

  useEffect(() => {
    if (!triggerOnHover || !containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (Math.random() > 0.7) {
        createSpark(x, y);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createSparkBurst(x, y);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [triggerOnHover, createSpark, createSparkBurst]);

  useEffect(() => {
    return () => {
      sparksRef.current.forEach(spark => {
        spark.element.remove();
      });
      sparksRef.current = [];
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}

export function ElectricLine({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`absolute ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      style={{ filter: 'drop-shadow(0 0 8px hsl(45 70% 55%))' }}
    >
      <path
        d="M10 100 L50 100 L60 80 L80 120 L100 60 L120 140 L140 90 L160 110 L190 100"
        stroke="url(#electricGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="animate-pulse"
        style={{
          strokeDasharray: '300',
          strokeDashoffset: '300',
          animation: 'circuit-flow 2s linear infinite',
        }}
      />
      <defs>
        <linearGradient id="electricGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(45 70% 55%)" />
          <stop offset="50%" stopColor="hsl(45 80% 70%)" />
          <stop offset="100%" stopColor="hsl(45 70% 55%)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LightningBolt({ className = '', animate = true }: { className?: string; animate?: boolean }) {
  return (
    <svg
      className={`${className} ${animate ? 'animate-bolt-flash' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
        fill="url(#boltGradient)"
        stroke="hsl(45 70% 55%)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 6px hsl(45 70% 55%))' }}
      />
      <defs>
        <linearGradient id="boltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(45 80% 65%)" />
          <stop offset="100%" stopColor="hsl(45 60% 45%)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CircuitPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`absolute ${className}`}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.15 }}
    >
      {/* Horizontal lines */}
      <line x1="0" y1="50" x2="100" y2="50" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      <line x1="150" y1="50" x2="250" y2="50" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      <line x1="300" y1="50" x2="400" y2="50" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      
      <line x1="50" y1="150" x2="150" y2="150" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      <line x1="200" y1="150" x2="350" y2="150" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      
      <line x1="0" y1="250" x2="100" y2="250" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      <line x1="150" y1="250" x2="300" y2="250" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      <line x1="350" y1="250" x2="400" y2="250" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      
      <line x1="100" y1="350" x2="200" y2="350" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      <line x1="250" y1="350" x2="400" y2="350" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      
      {/* Vertical lines */}
      <line x1="50" y1="0" x2="50" y2="100" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      <line x1="50" y1="150" x2="50" y2="250" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      <line x1="50" y1="300" x2="50" y2="400" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      
      <line x1="150" y1="50" x2="150" y2="150" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      <line x1="150" y1="200" x2="150" y2="300" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      
      <line x1="250" y1="0" x2="250" y2="100" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      <line x1="250" y1="150" x2="250" y2="250" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      <line x1="250" y1="300" x2="250" y2="400" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      
      <line x1="350" y1="100" x2="350" y2="200" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      <line x1="350" y1="250" x2="350" y2="350" stroke="hsl(45 70% 55%)" strokeWidth="1" />
      
      {/* Nodes */}
      <circle cx="50" cy="50" r="4" fill="hsl(45 70% 55%)" className="animate-pulse" />
      <circle cx="150" cy="50" r="4" fill="hsl(45 70% 55%)" />
      <circle cx="250" cy="50" r="4" fill="hsl(45 70% 55%)" className="animate-pulse" />
      <circle cx="350" cy="50" r="4" fill="hsl(45 70% 55%)" />
      
      <circle cx="50" cy="150" r="4" fill="hsl(45 70% 55%)" />
      <circle cx="150" cy="150" r="4" fill="hsl(45 70% 55%)" className="animate-pulse" />
      <circle cx="250" cy="150" r="4" fill="hsl(45 70% 55%)" />
      <circle cx="350" cy="150" r="4" fill="hsl(45 70% 55%)" className="animate-pulse" />
      
      <circle cx="50" cy="250" r="4" fill="hsl(45 70% 55%)" className="animate-pulse" />
      <circle cx="150" cy="250" r="4" fill="hsl(45 70% 55%)" />
      <circle cx="250" cy="250" r="4" fill="hsl(45 70% 55%)" className="animate-pulse" />
      <circle cx="350" cy="250" r="4" fill="hsl(45 70% 55%)" />
      
      <circle cx="150" cy="350" r="4" fill="hsl(45 70% 55%)" />
      <circle cx="250" cy="350" r="4" fill="hsl(45 70% 55%)" className="animate-pulse" />
      <circle cx="350" cy="350" r="4" fill="hsl(45 70% 55%)" />
    </svg>
  );
}
