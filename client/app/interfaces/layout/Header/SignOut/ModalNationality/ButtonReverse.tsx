import ButtonStyled from '../../../../components/Basic/ButtonStyled';
import ArrowLeftIcon from '../../../../components/icons/ArrowLeftIcon';
import { useAppsStore } from '../../../../../infrastructure/stores/useAppStore';
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
