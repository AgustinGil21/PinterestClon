import { memo, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LinkNavigate from '../Header/Nav/LinkNavigate';
import { useAppsStore } from '../../../infrastructure/stores/useAppStore';

const AsideConfig = memo(() => {
  const pathname = usePathname();
  const {
    userPublicData,
    isOpenMenuAsideSettingsResponsive,
    openMenuAsideSettingsResponsive,
    t,
  } = useAppsStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);

      if (!isMobileView && isOpenMenuAsideSettingsResponsive) {
        openMenuAsideSettingsResponsive();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpenMenuAsideSettingsResponsive, openMenuAsideSettingsResponsive]);

  // if (!userPublicData?.email_address || pathname === '/') {
  //   return null;
  // }

  return (
    <div>
      {isMobile && isOpenMenuAsideSettingsResponsive && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-40'
          onClick={openMenuAsideSettingsResponsive}
        ></div>
      )}

      <aside
        className={`fixed bg-white dark:bg-gray-900 h-full max-w-[80%] z-50 transform transition-transform duration-300 ${
          isMobile
            ? isOpenMenuAsideSettingsResponsive
              ? 'translate-x-0'
              : '-translate-x-full'
            : 'relative max-w-none px-6 py-8'
        }`}
      >
        <nav>
          <ul className='flex flex-col gap-2 font-semibold'>
            <LinkNavigate href='/edit-user' classProps=''>
              <div
                className={`w-fit text-[13px] link-settings-aside ${
                  pathname === '/edit-user' ? 'link-settings-aside-active' : ''
                } hover:bg-gray-200 px-2 py-1 rounded-md dark:hover:bg-slate-800`}
              >
                {t?.['aside-settings']['edit-profile'] || 'Editar Perfil'}
              </div>
            </LinkNavigate>
            <LinkNavigate href='/admin-user' classProps=''>
              <div
                className={`w-fit text-[13px] link-settings-aside ${
                  pathname === '/admin-user' ? 'link-settings-aside-active' : ''
                } px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800`}
              >
                {t?.['aside-settings']['account-management'] ||
                  'Administración de la cuenta'}
              </div>
            </LinkNavigate>
            <LinkNavigate href='/privacy-info' classProps=''>
              <div
                className={`w-fit text-[13px] link-settings-aside ${
                  pathname === '/privacy-info'
                    ? 'link-settings-aside-active'
                    : ''
                } rounded-md hover:bg-gray-200 px-2 py-1 dark:hover:bg-slate-800`}
              >
                {t?.['aside-settings'].privacy || 'Privacidad y datos'}
              </div>
            </LinkNavigate>
            <LinkNavigate href='/security-profile' classProps=''>
              <div
                className={`w-fit text-[13px] link-settings-aside ${
                  pathname === '/security-profile'
                    ? 'link-settings-aside-active'
                    : ''
                } rounded-md hover:bg-gray-200 px-2 py-1 dark:hover:bg-slate-800`}
              >
                {t?.['aside-settings'].security || 'Seguridad'}
              </div>
            </LinkNavigate>
          </ul>
        </nav>
      </aside>
    </div>
  );
});

AsideConfig.displayName = 'AsideConfig';
export default AsideConfig;
