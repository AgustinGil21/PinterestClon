import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import FiltersIcon from '../interfaces/components/icons/FiltersIcon';

const ButtonFilter = () => {
  const { isOpenFiltersModal, openFiltersModal } = useAppsStore();

  const handleClick = () => {
    openFiltersModal();
  };

  return (
    <ButtonStyled
      handleClick={handleClick}
      className={` hidden md:flex flex-row-reverse text-start max-w-[90px] !p-3 sticky items-center gap-2 font-semibold mx-2 ${
        isOpenFiltersModal
          ? 'bg-black text-white'
          : 'bg-buttonGreyBg text-black hover:bg-gray-300'
      }`}
    >
      Filtros
      <FiltersIcon isOpenFiltersModal={isOpenFiltersModal} />
    </ButtonStyled>
  );
};

export default ButtonFilter;
