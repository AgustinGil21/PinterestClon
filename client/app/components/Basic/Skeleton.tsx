import { adjustColorBrightness } from '../../libs/adjustColorBrightness';

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
  delay?: string;
  animation?: 'shimmer' | 'pulse';
  secondaryColor?: string;
  timingFunction?:
    | 'linear'
    | 'ease'
    | `ease-${'in-out' | 'in' | 'out'}`
    | `step-${'end' | 'start'}`
    | `steps${string}`
    | `cubic-bezier${string}`
    | `frames${string}`
    | `spring${string}`;
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
  delay,
  animation,
  secondaryColor,
  timingFunction = 'linear',
}: Props) => {
  let skeletonColor = color || '#f0f0f0';

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

  let animationName = 'shimmer';

  if (animation === 'pulse') {
    animationName = 'pulse';
  } else if (animation === 'shimmer') {
    animationName = angle === 'horizontal' ? 'shimmer-vertical' : 'shimmer';
  }

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

  const pulseAnimationKeyframes = `
    @keyframes pulse {
      0% { background-color: ${color}; }
      50% { background-color: ${secondaryColor}; }
      100% { background-color: ${color}; }
    }
  `;

  return (
    <>
      <style>{pulseAnimationKeyframes}</style>
      <div
        style={{
          width: width,
          height: height,
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          minHeight: minHeight,
          minWidth: minWidth,
          borderRadius: borderRadius,
          backgroundColor: animation === 'pulse' ? skeletonColor : undefined,
          backgroundImage:
            animation !== 'pulse'
              ? `linear-gradient(
          ${animationAngle},
          ${skeletonColor} 25%,
          ${
            secondaryColor
              ? secondaryColor
              : adjustColorBrightness(skeletonColor, 20)
          } 50%,
          ${skeletonColor} 75%
          )`
              : undefined,
          backgroundSize: animation === 'pulse' ? undefined : backgroundSize,
          animation: `${animationName} ${animationSpeed} ${timingFunction} infinite`,
          animationDirection: animationDirection,
          animationDelay: delay,
        }}
        className={`${fontSize && fonts[fontSize]} ${
          presetsStyle[presets || 'rectangle']
        } ${className} `}
      ></div>
    </>
  );
};
