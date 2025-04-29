import React from 'react';
import SectionTitle from './SectionTitle';

// Iconos simples (puedes cambiarlos luego por SVGs reales si quieres)
const icons = [
  '🔎', // Encuentra tu partido
  '📅', // Reserva tu lugar
  '⚽'  // Juega y conecta
];

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Encuentra tu partido',
      description: 'Explora cientos de partidos disponibles, filtra por ubicación y nivel de habilidad.',
      image: '/Mapa-portrait.png'
    },
    {
      title: 'Reserva tu lugar',
      description: 'Ve los detalles del partido, invita amigos y asegura tu cupo rápidamente.',
      image: '/DetallesDePartido-portrait.png'
    },
    {
      title: 'Juega y conecta',
      description: 'Asiste al partido, juega y haz nuevas conexiones en la comunidad futbolera.',
      image: '/Realisticfootballers.png'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="Cómo Funciona"
          subtitle="Un proceso sencillo para empezar a jugar fútbol en minutos"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative flex flex-col items-center text-center bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Ícono superior */}
              <div className="text-4xl mb-4">
                {icons[index]}
              </div>

              {/* Mockup contenido */}
              <div className="w-full h-72 flex items-center justify-center bg-gray-100 rounded-2xl overflow-hidden shadow-inner mb-6 group-hover:scale-105 transition-transform">
                <img 
                  src={step.image}
                  alt={step.title}
                  className="h-full w-auto object-contain"
                />
              </div>

              {/* Texto */}
              <h3 className="text-2xl font-extrabold mb-3 text-gray-900">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
