interface Props {
  centerY: boolean;
  centerX: boolean;
  left: boolean;
  top: boolean;
  right: boolean;
  bottom: boolean;
}

export const getDynamicPositionClass = ({
  centerX,
  centerY,
  left,
  top,
  bottom,
  right,
}: Props): string => {
  // Clase base común
  const baseClass = 'absolute';

  if (centerX && centerY) {
    // Centrado debajo
    return `${baseClass} top-[calc(100%+8px)] left-1/2 transform -translate-x-1/2`;
  }
  if (centerX) {
    // A la izquierda
    return `${baseClass} top-1/2 right-[calc(100%+8px)] transform -translate-y-1/2`;
  }
  if (centerY) {
    // Debajo
    return `${baseClass} top-[calc(100%+8px)] left-1/2 transform -translate-x-1/2`;
  }
  if (left && top) {
    // Esquina superior izquierda
    return `${baseClass} top-[-8px] left-[-8px]`;
  }
  if (left && bottom) {
    // Esquina inferior izquierda
    return `${baseClass} top-[calc(100%+8px)] left-[-8px]`;
  }
  if (right && top) {
    // Esquina superior derecha
    return `${baseClass} top-[-8px] left-[calc(100%+8px)]`;
  }
  if (right && bottom) {
    // Esquina inferior derecha
    return `${baseClass} top-[calc(100%+8px)] left-[calc(100%+8px)]`;
  }
  if (top) {
    return `${baseClass} top-[-8px] left-1/2 transform -translate-x-1/2`;
  }
  if (bottom) {
    return `${baseClass} top-[calc(100%+8px)] left-1/2 transform -translate-x-1/2`;
  }
  if (right) {
    return `${baseClass} top-1/2 left-[calc(100%+8px)] transform -translate-y-1/2`;
  }
  if (left) {
    return `${baseClass} top-1/2 right-[calc(100%+8px)] transform -translate-y-1/2`;
  }

  // En caso de no cumplir ninguna condición
  return baseClass;
};
