import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3 transition-all">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/">
          <Logo className="h-8 md:h-10" />
        </Link>

        {/* Navegación en escritorio */}
        <div className="hidden md:flex space-x-8 items-center">
          <NavLinks />
        </div>

        {/* Botón de menú móvil */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Navegación móvil */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLinks onClick={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinksProps {
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ onClick }) => {
  return (
    <Link
      to="/canchas"
      className="text-gray-800 hover:text-black hover:underline font-medium transition-colors"
      onClick={onClick}
    >
      Canchas
    </Link>
  );
};

export default Header;
