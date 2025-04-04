interface ArrowCreateCloseOptionsInterface {
  imagePreview: string | null;
}

const ArrowCreateCloseOptions = ({
  imagePreview,
}: ArrowCreateCloseOptionsInterface) => {
  return (
    <svg
      aria-label='Ícono de flecha más opciones'
      className={`Uvi gUZ U9O kVc fill-current text-black dark:text-white ${
        !imagePreview && 'text-gray-200'
      }`}
      height='12'
      role='img'
      viewBox='0 0 24 24'
      width='12'
    >
      <path d='M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0'></path>
    </svg>
  );
};

export default ArrowCreateCloseOptions;
