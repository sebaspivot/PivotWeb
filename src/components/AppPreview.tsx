import React from 'react';
import SectionTitle from './SectionTitle';
import { Smartphone } from 'lucide-react';

const AppPreview: React.FC = () => {
  return (
    <section id="app-preview" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="La App Pivot"
          subtitle="Organiza fútbol fácil, rápido y a tu medida"
        />
        
        <div className="mt-16 flex flex-col-reverse md:flex-row items-center justify-center gap-16">
          
          {/* Texto Izquierdo */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left animate-fade-in-up">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Diseñada para optimizar tu pasión futbolera
            </h3>
            <ul className="space-y-5 text-gray-700 text-lg mt-6">
              <li className="flex items-start justify-center md:justify-start">
                <div className="text-green-500 mr-4 mt-1">
                  <Smartphone size={24} />
                </div>
                <p>Interfaz minimalista y rápida para navegar fácilmente.</p>
              </li>
              <li className="flex items-start justify-center md:justify-start">
                <div className="text-green-500 mr-4 mt-1">
                  <Smartphone size={24} />
                </div>
                <p>Organiza partidos y únete a juegos en segundos.</p>
              </li>
              <li className="flex items-start justify-center md:justify-start">
                <div className="text-green-500 mr-4 mt-1">
                  <Smartphone size={24} />
                </div>
                <p>Recibe notificaciones de tus partidos y amigos.</p>
              </li>
            </ul>
          </div>

          {/* Mockup derecho */}
          <div className="md:w-1/2 flex justify-center animate-fade-in">
            <div className="w-[300px] h-auto relative">
              <img 
                src="/PartidosDisponibles-portrait.png"
                alt="Vista previa de la App Pivot"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AppPreview;


