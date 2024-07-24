import LinkNavigate from './LinkNavigate';

interface NavUserProps {
  loginAuth: boolean;
}

const NavUser = ({ loginAuth }: NavUserProps) => {
  return (
    <nav>
      <ul className='text-black flex gap-6 text-sm '>
        {loginAuth ? (
          <>
            <LinkNavigate href={'/#'}>Inicio</LinkNavigate>
            <LinkNavigate href={'/#'}>Explorar</LinkNavigate>
            <LinkNavigate href={'/#'}>Crear</LinkNavigate>
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
