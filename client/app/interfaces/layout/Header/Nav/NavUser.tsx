import { useAppsStore } from '../../../../infrastructure/stores/useAppStore';
import LinkNavigate from './LinkNavigate';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaHome, FaSearch, FaPlus } from 'react-icons/fa';

interface NavUserProps {
  loginAuth: boolean;
}

const NavUser = ({ loginAuth }: NavUserProps) => {
  const { userPublicData, t } = useAppsStore();
  const pathname = usePathname();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav>
      <ul className='text-black dark:text-white font-medium flex items-center gap-10 md:gap-6 text-[13.5px] mr-2'>
        {userPublicData?.username ? (
          <>
            {isMobileView ? (
              <>
                <LinkNavigate
                  classProps={`p-2 rounded-full transition-colors ${
                    pathname === '/' ? 'active-mobile' : 'hover:bg-slate-200'
                  } `}
                  href={'/'}
                >
                  <FaHome size={24} />
                </LinkNavigate>
                <LinkNavigate
                  classProps={`p-2 rounded-full transition-colors ${
                    pathname === '/explore' ||
                    pathname.startsWith('/searchcategory')
                      ? 'active-mobile'
                      : 'hover:bg-slate-200'
                  }`}
                  href={'/explore'}
                >
                  <FaSearch size={24} />
                </LinkNavigate>
                <LinkNavigate
                  classProps={`p-2 rounded-full transition-colors ${
                    pathname === '/create-pin'
                      ? 'active-mobile'
                      : 'hover:bg-slate-200'
                  }`}
                  href={'/create-pin'}
                >
                  <FaPlus size={24} />
                </LinkNavigate>
              </>
            ) : (
              <>
                <LinkNavigate
                  classProps={`${pathname === '/' ? 'active' : ''}`}
                  href={'/'}
                >
                  {t?.header.buttons.home || 'Inicio'}
                </LinkNavigate>
                <LinkNavigate
                  classProps={`${
                    pathname === '/explore' ||
                    pathname.startsWith('/searchcategory')
                      ? 'active'
                      : ''
                  }`}
                  href={'/explore'}
                >
                  {t?.header.buttons.explore || 'Explorar'}
                </LinkNavigate>
                <LinkNavigate
                  classProps={`${pathname === '/create-pin' ? 'active' : ''}`}
                  href={'/create-pin'}
                >
                  {t?.header.buttons.create || 'Crear'}
                </LinkNavigate>
              </>
            )}
          </>
        ) : (
          <>
            {isMobileView ? (
              <>
                <LinkNavigate
                  classProps={`p-2 rounded-full transition-colors ${
                    pathname === '/' ? 'active-mobile' : 'hover:bg-slate-200'
                  }`}
                  href={'/'}
                >
                  <FaHome size={24} />
                </LinkNavigate>
                <LinkNavigate
                  classProps={`p-2 rounded-full transition-colors ${
                    pathname === '/explore' ||
                    pathname.startsWith('/searchcategory')
                      ? 'active-mobile'
                      : 'hover:bg-slate-200'
                  }`}
                  href={'/explore'}
                >
                  <FaSearch size={24} />
                </LinkNavigate>
              </>
            ) : (
              <>
                <LinkNavigate
                  classProps={`${pathname === '/' ? 'active' : ''}`}
                  href={'/'}
                >
                  {t?.header.buttons.home || 'Inicio'}
                </LinkNavigate>
                <LinkNavigate
                  classProps={`${
                    pathname === '/explore' ||
                    pathname.startsWith('/searchcategory')
                      ? 'active'
                      : ''
                  }`}
                  href={'/explore'}
                >
                  {t?.header.buttons.explore || 'Explorar'}
                </LinkNavigate>
              </>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavUser;
