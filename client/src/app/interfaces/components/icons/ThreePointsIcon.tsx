interface ThreePointsInterface {
  isThreePointsAccountOpen?: boolean;
  className?: string;
}

const ThreePointsIcon = ({
  isThreePointsAccountOpen,
  className,
}: ThreePointsInterface) => {
  return (
    <svg
      aria-hidden='true'
      aria-label=''
      className={className}
      height='20'
      role='img'
      viewBox='0 0 24 24'
      width='20'
      fill={isThreePointsAccountOpen ? 'white' : 'currentColor'}
    >
      <path d='M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M3 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6m18 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6'></path>
    </svg>
  );
};

export default ThreePointsIcon;
