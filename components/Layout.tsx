import React, { ReactNode } from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Head>
      <title>Wedding Website</title>
    </Head>
    <noscript>
      <h1>Please enable JavaScript to view our site.</h1>
    </noscript>
    <main>
      <div className="container">{children}</div>
    </main>
  </>
);

export default Layout;
