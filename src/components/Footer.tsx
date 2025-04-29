import React from 'react';
import Logo from './Logo';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Mail 
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <Logo className="h-8 mb-4" />
            <p className="text-gray-600 max-w-xs">
              Pivot revoluciona la forma en que organizas y juegas partidos de fútbol amateur.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3">Enlaces</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-600 hover:text-black transition-colors">¿Qué es Pivot?</a></li>
                <li><a href="#benefits" className="text-gray-600 hover:text-black transition-colors">Beneficios</a></li>
                <li><a href="#how-it-works" className="text-gray-600 hover:text-black transition-colors">Cómo Funciona</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-3">Contacto</h3>
              <ul className="space-y-2">
                <li><a href="mailto:info@pivotapp.com" className="text-gray-600 hover:text-black transition-colors">info@pivotapp.com</a></li>
                <li><a href="tel:+573001234567" className="text-gray-600 hover:text-black transition-colors">+57 300 123 4567</a></li>
                <li><span className="text-gray-600">Bogotá, Colombia</span></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Pivot. Todos los derechos reservados.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-black transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors">
              <Facebook size={20} />
            </a>
            <a href="mailto:info@pivotapp.com" className="text-gray-400 hover:text-black transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;