import { Phone, MapPin, Clock, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/doctors", label: "Our Doctors" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/myths-and-facts", label: "Myths & Facts" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center text-sm gap-2">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <a href="tel:+919108915074" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="w-4 h-4" />
              <span className="hidden xs:inline">+91 98765 43210</span>
              <span className="xs:hidden">+91 98765 43210</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">Mon - Sat: 10:00 AM - 7:00 PM</span>
            <span className="sm:hidden">10AM-7PM</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading text-lg sm:text-xl font-bold">M</span>
            </div>
            <div className="hidden xs:block">
              <h1 className="font-heading text-lg sm:text-xl font-bold text-foreground leading-tight">Manu Homeopathy</h1>
              <p className="text-xs text-muted-foreground">Clinic & Research Center</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`transition-colors font-medium ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/book">
              <Button variant="hero" size="sm" className="hidden xs:flex">
                <span className="hidden sm:inline">Book Appointment</span>
                <span className="sm:hidden">Book</span>
              </Button>
            </Link>
            
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-2 border-t border-border mt-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 transition-colors font-medium ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/book" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="hero" size="lg" className="w-full mt-2">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
