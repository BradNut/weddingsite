import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkType {
  href: string;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkType> = ({ href, children }) => {
	const { asPath } = useRouter();
	const ariaCurrent = href === asPath ? "page" : undefined;

	return (
		<Link prefetch href={href} aria-current={ariaCurrent}>
			{children}
		</Link>
	);
};
