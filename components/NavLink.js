import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const NavLink = ({ href, children }) => {
  const { asPath } = useRouter();
  const ariaCurrent = href === asPath ? 'page' : undefined;

  return (
    <Link prefetch href={href} aria-current={ariaCurrent}>
      {children}
    </Link>
  );
};
