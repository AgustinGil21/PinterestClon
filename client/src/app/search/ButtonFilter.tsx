import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import FiltersIcon from '../interfaces/components/icons/FiltersIcon';

const ButtonFilter = () => {
  const { isOpenFiltersModal, openFiltersModal, t } = useAppsStore();

  const handleClick = () => {
    openFiltersModal();
  };

  return (
    <ButtonStyled
      handleClick={handleClick}
      className={` md:flex flex-row-reverse flex-nowrap text-start max-w-[90px] !p-4 responsivePx:!p-3 sticky items-center gap-2 font-semibold mx-1 responsivePx:mx-2 text-nowrap ${
        isOpenFiltersModal
          ? 'bg-black text-white'
          : 'bg-buttonGreyBg text-black hover:bg-gray-300'
      }`}
    >
      <span className='hidden responsivePx:flex'>
        {t?.filters['main-button'] || 'Filtros'}
      </span>

      <FiltersIcon isOpenFiltersModal={isOpenFiltersModal} />
    </ButtonStyled>
  );
};

export default ButtonFilter;
