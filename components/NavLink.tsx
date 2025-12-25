import type { PropsWithChildren } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps {
  href: string;
}

export const NavLink = ({ href, children }: PropsWithChildren<NavLinkProps>) => {
  const { asPath } = useRouter();
  const ariaCurrent = href === asPath ? 'page' : undefined;

  return (
    <Link prefetch href={href} aria-current={ariaCurrent}>
      {children}
    </Link>
  );
};
