@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

@layer base {
  :root {
    --background: 0 0% 6%;
    --foreground: 0 0% 98%;
    --card: 0 0% 8%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 8%;
    --popover-foreground: 0 0% 98%;
    --primary: 45 70% 55%;
    --primary-foreground: 0 0% 6%;
    --secondary: 0 0% 12%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 65%;
    --accent: 45 70% 55%;
    --accent-foreground: 0 0% 6%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 18%;
    --input: 0 0% 18%;
    --ring: 45 70% 55%;
    --radius: 0.625rem;
    --gold: 45 70% 55%;
    --gold-light: 45 80% 65%;
    --gold-dark: 45 60% 45%;
    --electric-blue: 195 100% 55%;
    --electric-cyan: 180 100% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-family: 'Inter', system-ui, sans-serif;
  }
}

/* Electric Spark Animation */
@keyframes spark {
  0%, 100% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
}

@keyframes spark-line {
  0% {
    stroke-dashoffset: 100;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}

@keyframes electric-pulse {
  0%, 100% {
    box-shadow: 0 0 5px hsl(var(--gold)), 0 0 10px hsl(var(--gold)), 0 0 20px hsl(var(--gold));
  }
  50% {
    box-shadow: 0 0 10px hsl(var(--gold)), 0 0 20px hsl(var(--gold)), 0 0 40px hsl(var(--gold)), 0 0 60px hsl(var(--gold));
  }
}

@keyframes glow-text {
  0%, 100% {
    text-shadow: 0 0 10px hsl(var(--gold) / 0.5), 0 0 20px hsl(var(--gold) / 0.3);
  }
  50% {
    text-shadow: 0 0 20px hsl(var(--gold) / 0.8), 0 0 40px hsl(var(--gold) / 0.5), 0 0 60px hsl(var(--gold) / 0.3);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes bolt-flash {
  0%, 100% {
    opacity: 0.3;
    filter: brightness(1);
  }
  50% {
    opacity: 1;
    filter: brightness(1.5);
  }
}

@keyframes circuit-flow {
  0% {
    stroke-dashoffset: 200;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.animate-spark {
  animation: spark 0.3s ease-out;
}

.animate-electric-pulse {
  animation: electric-pulse 2s ease-in-out infinite;
}

.animate-glow-text {
  animation: glow-text 2s ease-in-out infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-slide-in-left {
  animation: slide-in-left 0.6s ease-out forwards;
}

.animate-slide-in-right {
  animation: slide-in-right 0.6s ease-out forwards;
}

.animate-slide-in-up {
  animation: slide-in-up 0.6s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.5s ease-out forwards;
}

.animate-rotate-slow {
  animation: rotate-slow 20s linear infinite;
}

.animate-bolt-flash {
  animation: bolt-flash 1.5s ease-in-out infinite;
}

/* Spark particle styles */
.spark-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, hsl(var(--gold)) 0%, hsl(var(--gold-light)) 50%, transparent 100%);
  border-radius: 50%;
  pointer-events: none;
  box-shadow: 0 0 6px hsl(var(--gold)), 0 0 12px hsl(var(--gold-light));
}

/* Electric line effect */
.electric-line {
  stroke: hsl(var(--gold));
  stroke-width: 2;
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: 100;
  filter: drop-shadow(0 0 4px hsl(var(--gold))) drop-shadow(0 0 8px hsl(var(--gold-light)));
}

/* Glass morphism effect */
.glass {
  background: rgba(15, 15, 15, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-gold {
  background: linear-gradient(135deg, rgba(201, 169, 98, 0.1) 0%, rgba(15, 15, 15, 0.8) 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(201, 169, 98, 0.2);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-light)) 50%, hsl(var(--gold)) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Button styles */
.btn-electric {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-dark)) 100%);
  color: hsl(var(--background));
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-electric::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s ease;
}

.btn-electric:hover::before {
  left: 100%;
}

.btn-electric:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px hsl(var(--gold) / 0.5);
}

/* Card hover effect */
.card-electric {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.card-electric:hover {
  transform: translateY(-8px);
  border-color: hsl(var(--gold) / 0.3);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px -10px hsl(var(--gold) / 0.2);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--background));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--gold) / 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--gold) / 0.5);
}

/* Selection styling */
::selection {
  background: hsl(var(--gold) / 0.3);
  color: hsl(var(--foreground));
}

/* Circuit pattern background */
.circuit-bg {
  background-image: 
    linear-gradient(rgba(201, 169, 98, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201, 169, 98, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Noise texture overlay */
.noise-overlay {
  position: relative;
}

.noise-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.02;
  pointer-events: none;
  mix-blend-mode: overlay;
}
