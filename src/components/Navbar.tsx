import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary">Logo</span>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-600 hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">
                Contact
              </a>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#features"
                className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
              >
                Contact
              </a>
              <button className="w-full mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;