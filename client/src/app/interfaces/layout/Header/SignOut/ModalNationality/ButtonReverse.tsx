import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import ArrowLeftIcon from '@/app/interfaces/components/icons/ArrowLeftIcon';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
const ButtonReverse = () => {
  const reverseNationalityForGender = useAppsStore(
    (state) => state.reverseNationalityForGender
  );

  return (
    <div className='flex mb-7'>
      <ButtonStyled
        className=''
        handleClick={reverseNationalityForGender}
        disabled={false}
      >
        <ArrowLeftIcon />
      </ButtonStyled>
    </div>
  );
};

export default ButtonReverse;
