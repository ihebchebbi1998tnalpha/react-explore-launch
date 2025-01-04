import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/30 to-white animate-gradient-y -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-secondary-foreground mb-6">
            Welcome to Your Next
            <span className="text-primary"> Amazing Project</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start building something incredible with modern tools and beautiful design.
            Your journey begins here.
          </p>
          <button className="group bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-dark transition-colors inline-flex items-center gap-2">
            Get Started
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;