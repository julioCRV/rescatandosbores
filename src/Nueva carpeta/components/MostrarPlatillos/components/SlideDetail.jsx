import React from 'react';
import { useParams } from 'react-router-dom';

const SlideDetail = () => {
  const { slideNumber } = useParams();

  return (
    <div>
      <h2>Slide {slideNumber}</h2>
      {/* Agrega el contenido específico de cada diapositiva aquí */}
    </div>
  );
};

export default SlideDetail;
