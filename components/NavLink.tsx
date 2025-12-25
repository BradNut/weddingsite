import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  const { asPath } = useRouter();
  const ariaCurrent = href === asPath ? 'page' : undefined;

  return (
    <Link prefetch href={href} aria-current={ariaCurrent}>
      {children}
    </Link>
  );
};
