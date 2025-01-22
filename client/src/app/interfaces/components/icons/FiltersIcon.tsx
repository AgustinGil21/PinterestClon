interface InterfaceFiltersIcon {
  isOpenFiltersModal: boolean;
}

const FiltersIcon = ({ isOpenFiltersModal }: InterfaceFiltersIcon) => {
  return (
    <svg
      aria-label='filter'
      className='Uvi gUZ U9O kVc h-4 w-4'
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9 19.5A1.75 1.75 0 1 1 9 16a1.75 1.75 0 0 1 0 3.5M22.25 16h-8.32a5.24 5.24 0 0 0-9.86 0H1.75a1.75 1.75 0 0 0 0 3.5h2.32a5.24 5.24 0 0 0 9.86 0h8.32a1.75 1.75 0 0 0 0-3.5M15 4.5A1.75 1.75 0 1 1 15 8a1.75 1.75 0 0 1 0-3.5M1.75 8h8.32a5.24 5.24 0 0 0 9.86 0h2.32a1.75 1.75 0 0 0 0-3.5h-2.32a5.24 5.24 0 0 0-9.86 0H1.75a1.75 1.75 0 0 0 0 3.5'
        fill={isOpenFiltersModal ? '#ffffff' : '#000000'} // Manejo correcto de colores dinámicos
      />
    </svg>
  );
};

export default FiltersIcon;
