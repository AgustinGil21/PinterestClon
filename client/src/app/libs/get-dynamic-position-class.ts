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
  if (!top) return `top-[68px] -left-1/2`;
  if (!bottom) return `-top-[500px] -left-1/2`;
  if (!left) return `top-[68px] -right-1/2`;
  if (!right) return `top-[68px] -left-1/2`;

  return `top-[68px] -left-1/2`;
};
