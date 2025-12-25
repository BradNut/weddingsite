import Document, { Html, Head, NextScript, Main, DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ReactElement } from 'react';

interface MyDocumentInitialProps extends DocumentInitialProps {
  styles: ReactElement[];
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()] as ReactElement[],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en-US">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
