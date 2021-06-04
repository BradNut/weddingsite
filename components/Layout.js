import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>NN By the Sea</title>
    </Head>
    <noscript>
      <h1>🐧🐧🐧 Please enable JavaScript to view our site. 🐧🐧🐧</h1>
    </noscript>
    <main>
      <div className="container">{children}</div>
    </main>
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node,
};
