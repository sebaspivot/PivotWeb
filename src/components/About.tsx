import React from 'react';

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-32 bg-cover bg-center"
      style={{
        backgroundImage: `url('/GroupPlayers.png')`, // Aquí puedes cambiar el fondo si quieres uno más sutil luego
      }}
    >
      {/* Capa blanca semitransparente encima */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

      {/* Contenido */}
      <div className="relative container mx-auto px-4 md:px-6 text-center max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 animate-fade-in">
          ¿Qué es Pivot?
        </h2>

        <p className="text-lg text-gray-700 mb-6 animate-fade-in-up">
          Nacimos para unir jugadores.  
          <br />
          Pivot conecta tu pasión por el fútbol con partidos reales, personas reales y momentos que importan.
        </p>

        <p className="text-lg text-gray-700 mb-8 animate-fade-in-up">
          Organiza, únete y vive el fútbol como debe ser: libre, cercano y humano.
        </p>

        <a
          href="#download"
          className="inline-block bg-black hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full transition-all animate-fade-in-up"
        >
          Empieza Hoy
        </a>
      </div>
    </section>
  );
};

export default About;


