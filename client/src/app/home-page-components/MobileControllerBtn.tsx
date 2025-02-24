import { useEffect, useState } from 'react';
import { useMobileHover } from '../hooks/useMobileHover';

interface Props {
  handleClick?: () => void;
  btnRef?: React.RefObject<HTMLButtonElement>;
  className?: string;
  children?: React.ReactNode;
  rotation?: number;
  hoverColor?: string;
  setIconColor?: (color: string) => void;
  id: string;
}

export const MobileControllerBtn = ({
  handleClick,
  btnRef,
  className,
  children,
  rotation = 0,
  hoverColor = '#e9f',
  setIconColor,
  id,
}: Props) => {
  const { isHovered, setIsHovered } = useMobileHover(id);

  const defaultColor = '#f1f1f1';
  const [bgColor, setBgColor] = useState(defaultColor);
  const [btnScale, setBtnScale] = useState(1);

  useEffect(() => {
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

  return (
    <button
      ref={btnRef}
      id={id}
      onClick={handleClick}
      className={`${className} p-2 flex justify-center items-center rounded-full group h-[40px] w-[40px] min-h-[40px] min-w-[40px]`}
      style={{
        rotate: `${-Math.abs(rotation)}deg`,
        backgroundColor: bgColor,
        scale: btnScale,
        transition: `300ms background-color ease, 300ms scale ease`,
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};
