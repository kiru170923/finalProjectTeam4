import React, { useEffect, useState } from 'react';
import '../Style/LoadingOverlay.css';

const LoadingOverlay = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <img className="spinner"   style={{width:"90px", height:'auto'}} src='/images/logo.png'></img>
    </div>
  );
};

export default LoadingOverlay;
