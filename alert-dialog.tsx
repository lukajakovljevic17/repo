import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { About } from '@/sections/About';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import { Toaster } from '@/components/ui/sonner';

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
