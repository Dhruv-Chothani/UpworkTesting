import { Heart, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading text-xl font-bold">M</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold leading-tight">Manu Homeopathy</h3>
                <p className="text-sm opacity-70">Clinic & Research Center</p>
              </div>
            </Link>
            <p className="opacity-70 mb-6 max-w-md leading-relaxed">
              Practicing classical homeopathy since 1998. Influenced by Dr. Prafful Vijaykar's 
              teachings, we focus on boosting immunity and treating the whole person — mind and body.
            </p>
            <div className="flex items-center gap-2 opacity-70">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm">Healing naturally for 28+ years</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="opacity-70 hover:opacity-100 transition-opacity">About Us</Link>
              </li>
              <li>
                <Link to="/doctors" className="opacity-70 hover:opacity-100 transition-opacity">Our Doctors</Link>
              </li>
              <li>
                <Link to="/services" className="opacity-70 hover:opacity-100 transition-opacity">Services</Link>
              </li>
              <li>
                <Link to="/blog" className="opacity-70 hover:opacity-100 transition-opacity">Blog</Link>
              </li>
              <li>
                <Link to="/myths-and-facts" className="opacity-70 hover:opacity-100 transition-opacity">Myths & Facts</Link>
              </li>
              <li>
                <Link to="/book" className="opacity-70 hover:opacity-100 transition-opacity">Book Appointment</Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-70 hover:opacity-100 transition-opacity">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 opacity-70 mt-0.5 flex-shrink-0" />
                <a 
                  href="https://maps.google.com/?q=Manu+Homeopathy+Clinic+Research+Center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  View on Google Maps
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 opacity-70 flex-shrink-0" />
                <a href="tel:+919876543210" className="opacity-70 hover:opacity-100 transition-opacity">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 opacity-70 flex-shrink-0" />
                <a href="mailto:contact@manuhomeopathy.com" className="opacity-70 hover:opacity-100 transition-opacity">
                  contact@manuhomeopathy.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-70">
              © {currentYear} Manu Homeopathy Clinic & Research Center. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link to="/admin" className="text-sm opacity-50 hover:opacity-70 transition-opacity">
                Admin
              </Link>
              <span className="text-sm opacity-70">
                Classical Homeopathy • Karnataka, India
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
