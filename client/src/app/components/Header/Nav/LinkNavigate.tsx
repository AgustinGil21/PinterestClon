import Link from 'next/link';

interface LinkNavigateProps {
  children: React.ReactNode;
  href: string;
  classProps?: string;
}

const LinkNavigate = ({ children, href, classProps }: LinkNavigateProps) => {
  return (
    <li className={`list-none ${classProps}`}>
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default LinkNavigate;
