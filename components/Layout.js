import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Wedding Website</title>
      <link rel="icon" type="image/svg" href="/penguin.svg" />
      <meta name="description" content="Wedding Website" />
      <meta name="theme-color" content="#FCCFB9" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Wedding Website" key="og:title" />
      <meta
        description="og:description"
        content="Wedding Website"
        key="ogdesc"
      />
      <meta
        property="og:site_name"
        content="Wedding Website"
        key="ogsitename"
      />
      <meta property="og:image" content="/penguin.svg" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary" />
      {/* <meta name="twitter:url" content="https://" /> */}
      <meta name="twitter:title" content="Wedding Website" />
      <meta name="twitter:description" content="Wedding Website" />
      <meta name="twitter:image" content="/b_shell_nut_favicon.png" />
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

Layout.propTypes = {
  children: PropTypes.node,
};
