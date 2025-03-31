import Link from 'next/link';
import { CSSProperties } from 'react';

interface LinkNavigateProps {
  children: React.ReactNode;
  href: string;
  classProps?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const LinkNavigate = ({
  children,
  href,
  classProps = '',
  onClick,
  style,
}: LinkNavigateProps) => {
  return (
    <li className={`list-none ${classProps}`} onClick={onClick} style={style}>
      <Link href={href} className='block'>
        {children}
      </Link>
    </li>
  );
};

export default LinkNavigate;
