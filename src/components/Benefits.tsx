import React from 'react';
import SectionTitle from './SectionTitle';
import { Calendar, MapPin, Users } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Calendar size={48} />,
      title: 'Crea partidos en segundos',
      description: 'Organiza juegos fácilmente desde tu celular.',
    },
    {
      icon: <MapPin size={48} />,
      title: 'Encuentra canchas fácilmente',
      description: 'Explora espacios deportivos disponibles cerca de ti.',
    },
    {
      icon: <Users size={48} />,
      title: 'Conecta con tu comunidad',
      description: 'Juega con personas reales, en tu ciudad.',
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-neutral-950 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="¿Por qué usar Pivot?"
          subtitle="Todo lo que necesitas para jugar fútbol fácilmente."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-2xl duration-300"
            >
              <div className="text-white mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default Benefits;



