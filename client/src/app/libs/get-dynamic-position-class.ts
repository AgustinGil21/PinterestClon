interface Props {
  left: boolean;
  top: boolean;
  right: boolean;
  bottom: boolean;
}

export const getDynamicPositionClass = ({
  left,
  top,
  bottom,
  right,
}: Props): string => {
  if (!left && !top) return `top-[68px] -right-1/2`;
  if (!right && !top) return `top-[68px] -left-1/2`;
  if (!right && !bottom) return `-top-[500px] -left-1/2`;
  if (!left && !bottom) return `-top-[500px] -right-1/2`;
  if (!bottom && !top && left) return `-top-10 -left-[362px]`;
  if (!bottom && !top && right) return `-top-10 -right-[362px]`;
  if (!top) return `top-[68px] -left-1/2`;
  if (!bottom) return `-top-[500px] -left-1/2`;
  if (!left) return `top-[68px] -right-1/2`;
  if (!right) return `top-[68px] -left-1/2`;

  return `top-[68px] -left-1/2`;
};
