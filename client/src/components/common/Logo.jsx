import React from 'react';

const Logo = ({ 
  className = "h-6 w-auto", 
  showText = true, 
  clickable = true, 
  onClick = null 
}) => {
  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  const logoElement = (
    <div className={`logo-container ${clickable ? 'cursor-pointer' : ''}`}>
      <img 
        src="/Logo-final-1.png" 
        alt="Jay Ambe Construction Logo" 
        className={`${className} logo-hd transition-all duration-200 hover:scale-105`}
        style={{
          imageRendering: 'crisp-edges',
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'contain',
          maxHeight: '60px'
        }}
        onError={(e) => {
          console.error('Logo failed to load');
          e.target.style.display = 'none';
        }}
      />
    </div>
  );

  if (clickable) {
    return (
      <div 
        onClick={handleClick}
        className="flex items-center focus-ring"
        aria-label="Jay Ambe Construction Logo"
      >
        {logoElement}
      </div>
    );
  }

  return logoElement;
};

export default Logo; 