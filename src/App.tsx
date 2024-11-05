import React, { useState, useEffect } from 'react';
import InitAnimation from './components/InitAnimation';
import RetroDesktop from './components/RetroDesktop';
import useDeviceDetect from './hooks/useDeviceDetect';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { isMobile, isTablet, isLandscape } = useDeviceDetect();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`
      min-h-screen-dynamic
      max-w-screen-dynamic
      bg-[#0D0208]
      text-[#00ff41]
      overflow-hidden
      ${isMobile ? 'text-sm' : 'text-base'}
      ${isTablet ? 'md:text-base' : ''}
      ${isLandscape ? 'landscape:text-base' : ''}
    `}>
      {!isInitialized ? (
        <InitAnimation />
      ) : (
        <RetroDesktop />
      )}
    </div>
  );
}