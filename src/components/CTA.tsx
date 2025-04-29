import React, { useState } from 'react';
import Button from './Button';
import { ArrowRight, Mail } from 'lucide-react';

const CTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    setSubmitted(true);
    // Clear form
    setEmail('');
  };
  
  return (
    <section id="cta" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Mantente informado
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            Sé el primero en enterarte cuando Pivot esté disponible. 
            Déjanos tu correo y te avisaremos cuando estemos listos para cambiar 
            la forma en que juegas fútbol.
          </p>
          
          {submitted ? (
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <Mail size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">¡Gracias por registrarte!</h3>
              <p className="text-gray-400">
                Te mantendremos informado sobre el lanzamiento de Pivot.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="bg-white text-black hover:bg-gray-200 group"
                >
                  Subscribirse
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                No compartiremos tu información con terceros.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;