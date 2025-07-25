
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-hatchery-darker/80 backdrop-blur-md py-2" : "bg-transparent py-6"
    }`}>
      <div className="container mx-auto flex flex-col items-center px-4">
        {/* Logo centered at top */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img 
              src="/logo-1.png" 
              alt="Hatchery No.7 Logo" 
              className="h-32 w-32 cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{ background: 'transparent' }}
              onClick={scrollToTop}
            />
          </div>
        </div>
        
        {/* Menu options below logo */}
        <div className="hidden md:flex space-x-8 mb-4">
          {["Home", "Products", "Process", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="font-orbitron text-sm tracking-wider text-hatchery-light hover:text-hatchery-mint transition-colors"
            >
              {item.toUpperCase()}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden absolute top-4 right-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-hatchery-mint hover:text-hatchery-accent transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`
        md:hidden fixed inset-0 bg-hatchery-darker/95 backdrop-blur-md z-40 transition-transform duration-300 transform
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {["Home", "Products", "Process", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="font-orbitron text-xl tracking-wider text-hatchery-light hover:text-hatchery-mint transition-colors"
            >
              {item.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
