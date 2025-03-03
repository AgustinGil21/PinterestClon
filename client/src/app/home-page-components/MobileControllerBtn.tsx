import { useEffect, useState } from 'react';
import { useMobileHover } from '../hooks/useMobileHover';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

interface Props {
  handleClick?: () => void;
  btnRef?: React.RefObject<HTMLButtonElement>;
  className?: string;
  children?: React.ReactNode;
  rotation?: number;
  hoverColor?: string;
  setIconColor?: (color: string) => void;
  id: string;
  onHoverTranslateX?: number;
  onHoverTranslateY?: number;
  setIsHovered?: (isHovered: boolean) => void;
  setAlreadyHovered?: (alreadyHovered: boolean) => void;
}

export const MobileControllerBtn = ({
  handleClick,
  btnRef,
  className,
  children,
  rotation = 0,
  hoverColor = '#ee99ff',
  setIconColor,
  id,
  onHoverTranslateX,
  onHoverTranslateY,
  setIsHovered: setIsBtnHovered,
  setAlreadyHovered,
}: Props) => {
  const { mobileControllerUserIsHolding } = useAppsStore();
  const { isHovered, setIsHovered } = useMobileHover(id);

  const defaultColor = '#f1f1f1';
  const [bgColor, setBgColor] = useState(defaultColor);
  const [btnScale, setBtnScale] = useState(1);

  let transformClass =
    onHoverTranslateX && onHoverTranslateY
      ? `translate(${onHoverTranslateX}px,${onHoverTranslateY}px)`
      : onHoverTranslateX
      ? `translateX(${onHoverTranslateX}px)`
      : onHoverTranslateY
      ? `translateY(${onHoverTranslateY}px)`
      : '';

  const handleTouchClick = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsHovered(false);
    if (handleClick) handleClick();
  };

  useEffect(() => {
    if (setIsBtnHovered) setIsBtnHovered(isHovered);
    if (setAlreadyHovered) setAlreadyHovered(true);
    if (isHovered) {
      setBgColor(hoverColor);
      setBtnScale(1.2);
      if (setIconColor) setIconColor('#ffffff');
    } else {
      setBgColor(defaultColor);
      setBtnScale(1);
      if (setIconColor) setIconColor('#000000');
    }
  }, [isHovered]);

  useEffect(() => {
    if (!handleClick) return;

    if (isHovered && !mobileControllerUserIsHolding) handleClick();
  }, [mobileControllerUserIsHolding]);

  return (
    <button
      ref={btnRef}
      id={id}
      onClick={handleClick}
      onTouchEnd={handleTouchClick}
      className={`${className} p-2 flex justify-center items-center rounded-full group h-[40px] w-[40px] min-h-[40px] min-w-[40px]`}
      style={{
        rotate: `${-Math.abs(rotation)}deg`,
        backgroundColor: bgColor,
        scale: btnScale,
        transition: `300ms background-color ease, 300ms scale ease, 300ms transform ease`,
        transform: `${isHovered ? transformClass : ''}`,
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};
