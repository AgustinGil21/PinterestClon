import Link from 'next/link';

interface LinkNavigateProps {
  children: React.ReactNode;
  href: string;
  classProps?: string;
  linkClass?: string;
  handleClick?: () => void;
}

const LinkNavigate = ({
  children,
  href,
  classProps,
  handleClick,
  linkClass,
}: LinkNavigateProps) => {
  return (
    <li className={`list-none ${classProps}`} onClick={handleClick}>
      <Link className={linkClass} href={href}>
        {children}
      </Link>
    </li>
  );
};

export default LinkNavigate;
