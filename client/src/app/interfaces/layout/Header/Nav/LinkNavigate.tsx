import Link from 'next/link';

interface LinkNavigateProps {
  children: React.ReactNode;
  href: string;
  classProps?: string;
  onClick?: () => void;
}

const LinkNavigate = ({
  children,
  href,
  classProps = '',
  onClick,
}: LinkNavigateProps) => {
  return (
    <li className={`list-none ${classProps}`} onClick={onClick}>
      <Link href={href} className='block'>
        {children}
      </Link>
    </li>
  );
};

export default LinkNavigate;
