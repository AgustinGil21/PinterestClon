import { memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LinkNavigate from '../Header/Nav/LinkNavigate';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

const AsideConfig = memo(() => {
  const router = useRouter();
  const pathname = usePathname();
  const { userPublicData } = useAppsStore();

  // useEffect(() => {
  //   if (!userPublicData?.email_address) {
  //     router.replace('/');
  //   }
  // }, [userPublicData, router]);

  if (!userPublicData?.email_address || pathname === '/') {
    return null;
  }

  return (
    <div>
      <aside className='px-6 py-8 dark:text-white'>
        <nav>
          <ul className='flex flex-col gap-2 font-semibold max-w-[140px]'>
            <LinkNavigate href='/edit-user' classProps=''>
              <div
                className={`w-fit text-[13px] link-settings-aside ${
                  pathname === '/edit-user' ? 'link-settings-aside-active' : ''
                } hover:bg-gray-200 px-2 py-1 rounded-md dark:hover:bg-slate-800`}
              >
                Editar Perfil
              </div>
            </LinkNavigate>
            <LinkNavigate href='/admin-user' classProps=''>
              <div
                className={`w-fit text-[13px] link-settings-aside ${
                  pathname === '/admin-user' ? 'link-settings-aside-active' : ''
                } px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800`}
              >
                Administración de la cuenta
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
                Privacidad y datos
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
                Seguridad
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
