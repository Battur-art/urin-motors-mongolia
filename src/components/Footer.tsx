import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Logo from "@/assets/urin.jpg";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={Logo} alt="Urin Motors" className="w-10 h-10" />
              <span className="font-heading font-bold text-xl">Urin Motors</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Японоос импортолсон чанартай машинуудыг Монголын зах зээлд нийлүүлэгч. 
              Найдвартай, шударга үйлчилгээ.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Холбоосууд</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/cars" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Машинууд
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Хадгалсан
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Харьцуулах
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Бидний тухай
                </Link>
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Брэндүүд</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/cars?brand=Toyota" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Toyota
                </Link>
              </li>
              <li>
                <Link to="/cars?brand=Lexus" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Lexus
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Холбоо барих</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+97699889966" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <Phone className="h-4 w-4" />
                  +976 99 88 99 66
                </a>
              </li>
              <li>
                <a href="https://wa.me/97699889966" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:info@urinmotors.mn" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <Mail className="h-4 w-4" />
                  info@urinmotors.mn
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Улаанбаатар хот, Баянзүрх дүүрэг</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Urin Motors. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
}
