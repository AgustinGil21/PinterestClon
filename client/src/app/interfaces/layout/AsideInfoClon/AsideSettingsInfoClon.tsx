import { usePathname } from 'next/navigation';
import LinkNavigate from '../Header/Nav/LinkNavigate';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

const AsideSettingsInfoClon = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { openMenuAsideInfoClon, isOpenMenuAsideInfoClonResponsive } =
    useAppsStore();

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);

      if (!isMobileView && isOpenMenuAsideInfoClonResponsive) {
        openMenuAsideInfoClon();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpenMenuAsideInfoClonResponsive, openMenuAsideInfoClon]);
  const pathname = usePathname();

  return (
    <>
      <div>
        {isMobile && isOpenMenuAsideInfoClonResponsive && (
          <div
            className='fixed inset-0 bg-black opacity-50 z-40'
            onClick={openMenuAsideInfoClon}
          ></div>
        )}
        <aside
          className={`fixed  bg-white dark:bg-gray-900 h-full max-w-[80%] md:px-7 z-50 transform transition-transform duration-300 ${
            isMobile
              ? isOpenMenuAsideInfoClonResponsive
                ? 'translate-x-0'
                : '-translate-x-full'
              : 'relative max-w-none  py-8'
          }`}
        >
          <nav>
            <ul className='flex flex-col gap-2 font-semibold'>
              <LinkNavigate href='/info-clon' classProps=''>
                <div
                  onClick={openMenuAsideInfoClon}
                  className={`w-fit text-[13px] link-settings-aside ${
                    pathname === '/info-clon'
                      ? 'link-settings-aside-active'
                      : ''
                  } hover:bg-gray-200 px-2 py-1 rounded-md dark:hover:bg-slate-800`}
                >
                  Informacion del clon
                </div>
              </LinkNavigate>
              <LinkNavigate href='/technologies' classProps=''>
                <div
                  onClick={openMenuAsideInfoClon}
                  className={`w-fit text-[13px] link-settings-aside ${
                    pathname === '/technologies'
                      ? 'link-settings-aside-active'
                      : ''
                  } px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800`}
                >
                  Tecnologias y proceso de desarollo
                </div>
              </LinkNavigate>
              <LinkNavigate href='/about-us' classProps=''>
                <div
                  onClick={openMenuAsideInfoClon}
                  className={`w-fit text-[13px] link-settings-aside ${
                    pathname === '/about-us' ? 'link-settings-aside-active' : ''
                  } rounded-md hover:bg-gray-200 px-2 py-1 dark:hover:bg-slate-800`}
                >
                  Sobre nosotros
                </div>
              </LinkNavigate>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default AsideSettingsInfoClon;
