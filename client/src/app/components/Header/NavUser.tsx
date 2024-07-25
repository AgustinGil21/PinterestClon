import LinkNavigate from './LinkNavigate';
import { usePathname } from 'next/navigation';

interface NavUserProps {
  loginAuth: boolean;
}

const NavUser = ({ loginAuth }: NavUserProps) => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className='text-black font-medium flex gap-6 text-xs '>
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
            <LinkNavigate href={'/#'}>Inicio</LinkNavigate>
            <LinkNavigate href={'/#'}>Explorar</LinkNavigate>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavUser;
