import Link from 'next/link';

interface LinkNavigateProps {
  children: React.ReactNode;
  href: string;
  classProps?: string;
}

const LinkNavigate = ({ children, href, classProps }: LinkNavigateProps) => {
  return (
    <Link href={href}>
      <li className={`list-none  ${classProps} `}>{children}</li>
    </Link>
  );
};

export default LinkNavigate;
