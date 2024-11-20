import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { useEffect } from 'react';

const TypeAcountAdmin = () => {
  const {
    getProfileVisibility,
    userProfileVisibility,
    patchProfileTypeVisibility,
  } = useAppsStore();

  useEffect(() => {
    getProfileVisibility();
  }, []);

  const handleClick = () => {
    try {
      const newAccountType =
        userProfileVisibility?.account_type === 'Business'
          ? 'Personal'
          : 'Business';

      patchProfileTypeVisibility({
        account_type: newAccountType,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-row items-center mt-4 justify-between'>
      <div>
        <span className='text-sm font-semibold'>
          Convertir a una cuenta para empresa
        </span>
        <p className='text-[12px] max-w-[270px]'>
          Con una cuenta para empresa, tendrás acceso a herramientas como
          anuncios y analytics para hacer crecer tu negocio en Pinterest.
        </p>
      </div>
      <div className='flex flex-col items-center mt-5 gap-1'>
        <ButtonStyled
          handleClick={handleClick}
          disabled={false}
          className='bg-buttonGreyBg font-semibold hover:bg-gray-300 dark:text-black '
        >
          Convertir cuenta
        </ButtonStyled>
        <span className='text-[13px] text-gray-500'>
          {' '}
          ({userProfileVisibility?.account_type})
        </span>
      </div>
    </div>
  );
};

export default TypeAcountAdmin;
