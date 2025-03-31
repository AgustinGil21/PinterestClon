'use client';

import { useRef, useState } from 'react';

const DynamicPositioning = () => {
  const parentRef = useRef(null);
  const [popupStyle, setPopupStyle] = useState<any>(null);

  // Definimos los umbrales en una constante
  const THRESHOLD = {
    top: 50,
    left: -100,
    right: 50,
    bottom: -100,
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    if (parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const buttonRect = event.target.getBoundingClientRect();

      // Calcula la posición del botón relativo al contenedor
      const buttonPosition = {
        top: buttonRect.top - parentRect.top,
        left: buttonRect.left - parentRect.left,
        right: parentRect.right - buttonRect.right,
        bottom: parentRect.bottom - buttonRect.bottom,
      };

      // Determina dónde posicionar el popup
      let position = {};

      if (buttonPosition.top < THRESHOLD.top) {
        // Cerca del borde superior
        if (buttonPosition.left < THRESHOLD.left) {
          position = { top: buttonRect.bottom, left: buttonRect.right }; // Abajo a la derecha
        } else if (buttonPosition.right < THRESHOLD.right) {
          position = { top: buttonRect.bottom, left: buttonRect.left - 100 }; // Abajo a la izquierda
        } else {
          position = { top: buttonRect.bottom, left: buttonRect.left }; // Directamente abajo
        }
      } else if (buttonPosition.bottom < THRESHOLD.bottom) {
        // Cerca del borde inferior
        if (buttonPosition.left < THRESHOLD.left) {
          position = { top: buttonRect.top - 50, left: buttonRect.right }; // Arriba a la derecha
        } else if (buttonPosition.right < THRESHOLD.right) {
          position = { top: buttonRect.top - 50, left: buttonRect.left - 100 }; // Arriba a la izquierda
        } else {
          position = { top: buttonRect.top - 50, left: buttonRect.left }; // Directamente arriba
        }
      } else if (buttonPosition.left < THRESHOLD.left) {
        // Cerca del borde izquierdo
        position = { top: buttonRect.top, left: buttonRect.right }; // A la derecha
      } else if (buttonPosition.right < THRESHOLD.right) {
        // Cerca del borde derecho
        position = { top: buttonRect.top, left: buttonRect.left - 100 }; // A la izquierda
      } else {
        // Posición por defecto
        position = { top: buttonRect.bottom, left: buttonRect.left }; // Abajo
      }

      // Aseguramos que el popup no se desborde fuera del contenedor
      const adjustedPosition = {
        top: Math.max(0, Math.min(position.top, parentRect.height - 50)), // Ajuste en el eje Y
        left: Math.max(0, Math.min(position.left, parentRect.width - 100)), // Ajuste en el eje X
      };

      setPopupStyle({
        position: 'absolute',
        top: `${adjustedPosition.top - 40}px`,
        left: `${adjustedPosition.left - 40}px`,
      });
    }
  };

  return (
    <div
      className='relative'
      ref={parentRef}
      style={{
        width: '500px',
        height: '500px',
        border: '1px solid black',
        position: 'relative',
        overflow: 'hidden',
        margin: '50px',
      }}
    >
      <button
        className=' p-2'
        onClick={handleButtonClick}
        style={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
        }}
      >
        Clickeame
      </button>
      {popupStyle && (
        <div
          style={{
            ...popupStyle,
            width: '100px',
            height: '50px',
            backgroundColor: 'lightblue',
            border: '1px solid blue',
          }}
        >
          Popup
        </div>
      )}
    </div>
  );
};

export default DynamicPositioning;
