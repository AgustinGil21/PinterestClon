import { useAppsStore } from '../../infrastructure/stores/useAppStore';
import ButtonStyled from '../../interfaces/components/Basic/ButtonStyled';
import { useEffect } from 'react';

const TypeAcountAdmin = () => {
  const {
    getProfileVisibility,
    userProfileVisibility,
    patchProfileTypeVisibility,
    t,
  } = useAppsStore();

  useEffect(() => {
    getProfileVisibility();
  }, []);

  const handleClick = () => {
    try {
      const newAccountType =
        userProfileVisibility?.account_type === 'Business'
          ? t?.user['account-type'].Personal || 'Personal'
          : t?.user['account-type'].Business || 'Negocio';

      patchProfileTypeVisibility({
        account_type: newAccountType,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col items-start md:items-center mt-4 justify-between md:flex-row'>
      <div>
        <span className='text-sm font-semibold'>
          {t?.['account-management']['business-account'].title ||
            'Convertir a una cuenta para empresa'}
        </span>
        <p className='text-[12px] max-w-[270px]'>
          {t?.['account-management']['business-account'].description ||
            'Con una cuenta para empresa, tendrás acceso a herramientas como anuncios y analytics para hacer crecer tu negocio en Pinterest.'}
        </p>
      </div>
      <div className='flex flex-col items-center mt-5 gap-1'>
        <ButtonStyled
          handleClick={handleClick}
          disabled={false}
          className='bg-buttonGreyBg font-semibold hover:bg-gray-300 dark:text-black '
        >
          {t?.['account-management']['business-account']['convert-account'] ||
            'Convertir cuenta'}
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
