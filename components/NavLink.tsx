import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const { asPath } = useRouter();
  const ariaCurrent = href === asPath ? 'page' : undefined;

  return (
    <Link prefetch href={href} aria-current={ariaCurrent}>
      {children}
    </Link>
  );
};
