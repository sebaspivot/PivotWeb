import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Coverage from './components/Coverage';
import AppPreview from './components/AppPreview';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      <main>
        <Hero />
        <About />
        <Benefits />
        <HowItWorks />
        <Coverage />
        <AppPreview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;