import LinkNavigate from './LinkNavigate';
import { usePathname } from 'next/navigation';

interface NavUserProps {
  loginAuth: boolean;
}

const NavUser = ({ loginAuth }: NavUserProps) => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className='text-black dark:text-white font-medium flex items-center gap-6 text-[13.5px] mr-2'>
        {loginAuth ? (
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
      </ul>
    </nav>
  );
};

export default NavUser;
