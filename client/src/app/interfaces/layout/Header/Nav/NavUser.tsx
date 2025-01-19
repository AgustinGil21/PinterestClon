import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import LinkNavigate from './LinkNavigate';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaHome, FaSearch, FaPlus } from 'react-icons/fa';

interface NavUserProps {
  loginAuth: boolean;
}

const NavUser = ({ loginAuth }: NavUserProps) => {
  const { userPublicData } = useAppsStore();
  const pathname = usePathname();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 750);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 750);
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
                  classProps={`${pathname === '/' ? 'active' : ''}`}
                  href={'/'}
                >
                  <FaHome size={24} />
                </LinkNavigate>
                <LinkNavigate
                  classProps={`${pathname === '/explore' ? 'active' : ''}`}
                  href={'/explore'}
                >
                  <FaSearch size={24} />
                </LinkNavigate>
                <LinkNavigate
                  classProps={`${pathname === '/create-pin' ? 'active' : ''}`}
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
                  Inicio
                </LinkNavigate>
                <LinkNavigate
                  classProps={`${pathname === '/explore' ? 'active' : ''}`}
                  href={'/explore'}
                >
                  Explorar
                </LinkNavigate>
                <LinkNavigate
                  classProps={`${pathname === '/create-pin' ? 'active' : ''}`}
                  href={'/create-pin'}
                >
                  Crear
                </LinkNavigate>
              </>
            )}
          </>
        ) : (
          <>
            {isMobileView ? (
              <>
                <LinkNavigate
                  classProps={`${pathname === '/' ? 'active' : ''}`}
                  href={'/'}
                >
                  <FaHome size={24} />
                </LinkNavigate>
                <LinkNavigate
                  classProps={`${pathname === '/explore' ? 'active' : ''}`}
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
                  Inicio
                </LinkNavigate>
                <LinkNavigate
                  classProps={`${pathname === '/explore' ? 'active' : ''}`}
                  href={'/explore'}
                >
                  Explorar
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
