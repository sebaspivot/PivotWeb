import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-8' }) => {
  return (
    <div className={`${className} flex items-center`}>
      <img 
        src="/pivot-logo.png" 
        alt="Pivot" 
        className="h-full w-auto object-contain"
        style={{ 
          maxWidth: '120px',
          imageRendering: 'crisp-edges'
        }}
      />
    </div>
  );
};

export default Logo;