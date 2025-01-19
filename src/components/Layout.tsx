import { useState } from 'react';
import { ShoppingCart, Menu, X, Heart, ClipboardList, Search, Pen } from "lucide-react";
import Footer from "./Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Top Navigation - Social Media Bar */}
      <div className="fixed top-0 z-50 w-full bg-primary py-2 text-sm text-white">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Livraison gratuite à partir de 255 DT</span>
            <span className="sm:hidden">Livraison &gt; 255 DT</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="fixed top-8 z-50 w-full bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className="h-6 w-6 text-primary" />
              )}
            </button>
            <h1 className="font-sans text-2xl font-bold text-primary">ELLES</h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full px-4 py-2 pl-10 border rounded-full focus:outline-none focus:border-secondary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Icons Navigation */}
          <div className="flex items-center gap-6">
            <a href="#" className="hidden md:flex items-center gap-1 text-primary hover:text-primary/80">
              <Heart className="h-6 w-6" />
              <span className="text-sm">Mes favoris</span>
            </a>
            <a href="#" className="hidden md:flex items-center gap-1 text-primary hover:text-primary/80">
              <ClipboardList className="h-6 w-6" />
              <span className="text-sm">Devis</span>
            </a>
            <div className="flex items-center gap-1 text-primary hover:text-primary/80">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-sm">Mon panier ({cartCount})</span>
            </div>
          </div>
        </div>

        {/* Main Menu Navigation */}
        <div className={`fixed inset-y-0 left-0 z-50 w-3/4 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } top-[104px] md:relative md:inset-auto md:flex md:w-auto md:transform-none md:justify-start md:bg-transparent md:shadow-none`}>
          <div className="flex h-full flex-col items-start space-y-6 p-6 md:flex-row md:items-center md:space-y-0 md:space-x-12 md:p-0 md:pb-6 container mx-auto">
            <div className="md:pl-16">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
                <a href="/homme" className="nav-link w-full pb-6 text-left text-gray-600 hover:text-primary md:w-auto md:pb-6">
                  HOMME
                </a>
                <a href="/femme" className="nav-link w-full pb-6 text-left text-gray-600 hover:text-primary md:w-auto md:pb-6">
                  FEMME
                </a>
                <a href="/metiers" className="nav-link w-full pb-6 text-left text-gray-600 hover:text-primary md:w-auto md:pb-6">
                  MÉTIERS
                </a>
                <a href="/marques" className="nav-link w-full pb-6 text-left text-gray-600 hover:text-primary md:w-auto md:pb-6">
                  MARQUES
                </a>
                <a href="#" className="nav-link w-full pb-6 text-left text-gray-600 hover:text-primary md:w-auto md:pb-6">
                  SAISON
                </a>
                <a href="#" className="nav-link w-full pb-6 text-left text-red-500 flex items-center gap-2 md:w-auto md:pb-6">
                  <Heart className="h-4 w-4" />
                  SOLDES
                </a>
                <a href="#personalization" className="nav-link w-full pb-6 text-left text-blue-500 flex items-center gap-2 md:w-auto md:pb-6">
                  <Pen className="h-4 w-4" />
                  PERSONNALISATION
                </a>
                <a href="#" className="nav-link w-full pb-6 text-left text-green-600 flex items-center gap-2 md:w-auto md:pb-6">
                  ECO RESPONSABLE
                </a>
                <a href="#" className="nav-link w-full pb-6 text-left text-gray-600 hover:text-primary md:w-auto md:pb-6">
                  BLOG
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content with proper padding to account for fixed navs */}
      <main className="pt-[160px] min-h-screen">
        {children}
      </main>

      <Footer />
    </div>
  );
};