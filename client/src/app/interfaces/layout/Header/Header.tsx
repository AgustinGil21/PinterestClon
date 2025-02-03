import React, { useState, useEffect } from 'react';
import PinterestLogo from '../../components/icons/PinterestLogo';
import SearchInput from './Search/SearchInput';
import NavUser from './Nav/NavUser';
import HeaderAuth from './SignOut/HeaderAuth';
import { UserLoggedIn } from './LogIn/UserLoggedIn';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import AvatarUser from './Avatar/AvatarUser';
import LinkNavigate from './Nav/LinkNavigate';
import { FaBars, FaBarsStaggered, FaXmark, FaInfo } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import CardCategorySlider from '@/app/search/CardCategorySlider';
import ButtonFilter from '@/app/search/ButtonFilter';
import InfoClon from '@/app/info-clon/page';
import InfoIcon from '../../components/icons/InfoIcon';

export const Header = () => {
  const {
    isAuth,
    userPublicData,
    getDataUserLogged,
    setIsHeaderLoaded,
    getLastBoard,
    getBoardsList,
    openMenuAsideSettingsResponsive,
    getCategoriesPin,
    isOpenMenuAsideSettingsResponsive,
    isOpenMenuAsideInfoClonResponsive,
    openMenuAsideInfoClon,
  } = useAppsStore();

  const [loading, setLoading] = useState(true);
  const [shadow, setShadow] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const pathname = usePathname();

  const routesResponsiveAsideSettings = [
    '/edit-user',
    '/admin-user',
    '/privacy-info',
    '/security-profile',
  ];

  const routesResponsiveAsideInfoClon = [
    '/info-clon',
    '/about-us',
    '/technologies',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getDataUserLogged();

        if (userPublicData && userPublicData.username) {
          const storedUsername = sessionStorage.getItem('username');
          if (!storedUsername || storedUsername !== userPublicData.username) {
            sessionStorage.setItem('username', userPublicData.username);
          }
        }
      } catch (error) {
        console.error(
          'Error al obtener la información pública del usuario:',
          error
        );
      } finally {
        setLoading(false);
        setIsHeaderLoaded(true);
      }
    };

    fetchData();
    getLastBoard();
    getBoardsList();
    getCategoriesPin();
  }, [getDataUserLogged, setIsHeaderLoaded]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <header
        className={`w-full h-auto text-white py-3 px-4 items-center bg-white dark:bg-gray-900 fixed top-0 z-[60] ${
          shadow ? 'shadow-md' : ''
        }`}
      >
        <div className='flex items-center justify-between w-full gap-3'>
          <div className='flex items-center gap-2.5'>
            <div className='hover:bg-slate-200 p-2 rounded-full cursor-pointer mr-1.5'>
              <PinterestLogo classProps='w-[21px] h-[21px]' />
            </div>
            {!isMobileView && <NavUser loginAuth={isAuth} />}
          </div>
          <SearchInput />
          <div className='hidden md:block mx-2'>
            {isAuth ? <UserLoggedIn /> : <HeaderAuth />}
          </div>
          {isAuth && (
            <div
              className={`md:hidden min-w-[40px] min-h-[40px] hover:bg-slate-200 rounded-full relative flex justify-center items-center cursor-pointer ${
                !routesResponsiveAsideSettings.includes(pathname) && 'hidden'
              }`}
              onClick={openMenuAsideSettingsResponsive}
            >
              {isOpenMenuAsideSettingsResponsive ? (
                <FaXmark size={25} color='black' />
              ) : (
                <FaBarsStaggered size={20} color='black' />
              )}
            </div>
          )}
          {routesResponsiveAsideInfoClon && (
            <div
              className={`md:hidden min-w-[40px] min-h-[40px] hover:bg-slate-200 rounded-full relative flex justify-center items-center cursor-pointer ${
                !routesResponsiveAsideInfoClon.includes(pathname) && 'hidden'
              }`}
              onClick={openMenuAsideInfoClon}
            >
              {isOpenMenuAsideInfoClonResponsive ? (
                <FaXmark size={25} color='black' />
              ) : (
                <FaBarsStaggered size={20} color='black' />
              )}
            </div>
          )}

          {isMobileView && (
            <LinkNavigate
              href='/info-clon'
              classProps={`${
                routesResponsiveAsideInfoClon.includes(pathname) && 'hidden'
              }`}
            >
              <InfoIcon />
            </LinkNavigate>
          )}
        </div>
        {pathname == '/search' && (
          <div className='w-full gap-3 mt-4 flex flex-row items-center'>
            <ButtonFilter />
            <CardCategorySlider />
          </div>
        )}
      </header>

      {isMobileView && (
        <aside className='w-full h-16 bg-white dark:bg-gray-900 p-2  fixed bottom-0 z-[60] flex gap-6 justify-center items-center border-t-2  shadow-3xl'>
          <NavUser loginAuth={isAuth} />
          {!isAuth && <HeaderAuth />}
          {isAuth && (
            <LinkNavigate
              href={`/${userPublicData?.username}`}
              classProps='hover:bg-slate-200 p-1 rounded-full cursor-pointer '
            >
              <AvatarUser
                data={userPublicData}
                classProps={` ${
                  userPublicData?.avatar
                    ? 'w-[30px] h-[30px]'
                    : 'w-[30px] h-[30px] p-3'
                } hover:bg-bg-slate-200 `}
                textSize='text-[12px]'
              />
            </LinkNavigate>
          )}
        </aside>
      )}
    </>
  );
};
