import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      // TODO: internationalization
      <Html lang="en">
        <Head>{/* Put any custom Fonts here */}</Head>
        <body>
          <Main />
          <NextScript />
          {/* Put any 3rd party scripts here */}
        </body>
      </Html>
    )
  }
}
