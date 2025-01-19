import { useEffect, useState } from 'react';

export const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-[url('/lovable-uploads/78d62786-9d81-4bf8-bca1-4fb2a185218b.png')] bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[90vh] items-center justify-center px-4">
        <div className="text-center text-white">
          <h1 className="animate-fade-in font-sans text-4xl font-bold leading-tight md:text-6xl">
            Tenues Professionnelles<br />
            pour les Héros Modernes
          </h1>
          <p className="mt-6 animate-fade-in-delayed font-body text-lg md:text-xl">
            Sublimez votre présence professionnelle avec notre collection premium
          </p>
          <a
            href="#products"
            className="mt-8 inline-block animate-fade-in-delayed rounded-full bg-white px-8 py-3 font-sans font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg"
          >
            Découvrir la Collection
          </a>
        </div>
      </div>
    </section>
  );
};