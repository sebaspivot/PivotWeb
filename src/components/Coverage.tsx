import React from 'react';
import SectionTitle from './SectionTitle';
import { MapPin } from 'lucide-react';

const Coverage: React.FC = () => {
  return (
    <section id="coverage" className="py-20 bg-neutral-950 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="Cobertura Inicial"
          subtitle="Comenzamos en Bogotá y pronto llegaremos a más ciudades"
        />
        
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <MapPin size={32} className="text-white mr-3" />
            <h3 className="text-2xl font-bold">Bogotá y alrededores</h3>
          </div>
          
          <div className="aspect-w-16 aspect-h-9 bg-white/10 rounded-lg overflow-hidden relative">
            {/* Aquí pondrías un mapa real en el futuro */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-green-500/80 mx-auto flex items-center justify-center mb-2">
                <MapPin size={24} className="text-white" />
              </div>
              <p className="font-medium text-white">Bogotá, Colombia</p>
              <p className="text-sm text-gray-400 mt-2">Próximamente en más ciudades</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Estamos expandiendo nuestra cobertura rápidamente. 
              ¡Pronto estaremos en las principales ciudades de Colombia!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
