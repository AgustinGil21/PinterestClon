import { adjustColorBrightness } from '@/app/libs/adjustColorBrightness';

interface Props {
  presets?: 'circle' | 'rectangle' | 'text' | 'rounded';
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'xl2' | 'xl3' | 'xl4';
  borderRadius?: string;
  className?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
  minHeight?: string | number;
  minWidth?: string | number;
  maxHeight?: string | number;
  maxWidth?: string | number;
  speed?: 'slow' | 'default' | 'fast';
  angle?: 'vertical' | 'horizontal' | 'diagonalLeft' | 'diagonalRight';
  direction?: 'top' | 'bottom' | 'left' | 'right';
}

export const Skeleton = ({
  presets,
  fontSize,
  borderRadius,
  className,
  color,
  width,
  height,
  speed,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  angle,
  direction,
}: Props) => {
  let skeletonColor = color || '#f0f0f0';

  // Regula la velocidad de la animación según
  // parámetro.
  const animationSpeed = {
    slow: '2.5s',
    default: '1.5s',
    fast: '0.5s',
  }[speed || 'default'];

  const animationAngle = {
    vertical: '90deg',
    horizontal: '180deg',
    diagonalRight: '45deg',
    diagonalLeft: '125deg',
  }[angle || 'vertical'];

  // Alturas de línea definidas para cada tamaño.
  const fonts = {
    xs: 'h-[16px]',
    sm: 'h-[20px]',
    base: 'h-[24px]',
    lg: 'h-[28px]',
    xl: 'h-[32px]',
    xl2: 'h-[36px]',
    xl3: 'h-[40px]',
    xl4: 'h-[44px]',
  };

  const presetsStyle = {
    circle: 'rounded-full',
    rectangle: '',
    rounded: 'rounded-md',
    text: 'rounded-sm',
  };

  const backgroundSize = angle === 'horizontal' ? '100% 200%' : '200% 100%';

  const animationName = angle === 'horizontal' ? 'shimmer-vertical' : 'shimmer';

  let animationDirection =
    (direction ?? 'top') === 'top' ? 'reverse' : 'normal';

  if (angle === 'vertical') {
    animationDirection =
      (direction ?? 'left') === 'left' ? 'reverse' : 'normal';
  } else if (angle === 'horizontal') {
    animationDirection = (direction ?? 'top') === 'top' ? 'reverse' : 'normal';
  } else if (angle === 'diagonalLeft') {
    animationDirection = (direction ?? 'top') === 'top' ? 'reverse' : 'normal';
  } else if (angle === 'diagonalRight') {
    animationDirection =
      (direction ?? 'bottom') === 'bottom' ? 'reverse' : 'normal';
  }

  return (
    <div
      style={{
        width: width,
        height: height,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        minHeight: minHeight,
        minWidth: minWidth,
        borderRadius: borderRadius,
        backgroundImage: `linear-gradient(
          ${animationAngle},
          ${skeletonColor} 25%,
          ${adjustColorBrightness(skeletonColor, 20)} 50%,
          ${skeletonColor} 75%
        )`,
        backgroundSize: backgroundSize,
        animation: `${animationName} ${animationSpeed} linear infinite`,
        animationDirection: animationDirection,
      }}
      className={`${fontSize && fonts[fontSize]} ${
        presetsStyle[presets || 'rectangle']
      } ${className}`}
    ></div>
  );
};
