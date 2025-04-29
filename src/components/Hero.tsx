import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-black text-white pt-32 pb-24 overflow-hidden">

      {/* Imagen de fondo en blanco y negro */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/Background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)',
        }}
      />

      {/* Capa oscura encima del fondo */}
      <div className="absolute inset-0 bg-black opacity-60" />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">

        {/* Texto */}
        <div className="flex flex-col space-y-8 text-center md:text-left md:flex-1 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Organiza tu pasión. <br />
            Juega fútbol donde y cuando quieras.
          </h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto md:mx-0">
            Crea partidos, encuentra canchas y conecta con jugadores reales en tu ciudad.
          </p>

          {/* Botones de descarga */}
          <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
            <img src="/AppStore.svg" alt="App Store" className="h-24 hover:scale-105 transition-transform" />
            <img src="/PlayStore.svg" alt="Google Play" className="h-24 hover:scale-105 transition-transform" />
          </div>
        </div>

        {/* Mockup */}
        <div className="flex justify-center md:justify-center md:flex-1 animate-fade-in">
          <img
            src="/PartidosDisponibles-left.png"
            alt="Vista partidos"
            className="h-[420px] w-auto object-contain transform rotate-[-6deg] drop-shadow-2xl transition-transform hover:scale-105"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;





