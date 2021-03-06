import * as React from 'react'
import Head from 'next/head'

const defaultTitle = 'XBT/USD | OrderBook'
const defaultDescription = 'Orderbook for xbt to USD'

interface Props {
  description?: string
  ogImage?: string
  title?: string
  url?: string
}

const PageLayout: React.FunctionComponent<Props> = ({
  children,
  title = defaultTitle,
  description = defaultDescription,
  // ogImage = '',
  url = '/'
}) => {
  return (
    <>
      <Head>
        {/* design */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* favicon */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/favicon-mask.svg" color="#000000" />
        {/* Primary SEO */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        {/* <meta property="og:image" content={ogImage} /> */}
        {/* twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        {/* <meta property="twitter:image" content={ogImage} /> */}
      </Head>
      <main>{children}</main>
    </>
  )
}

export default PageLayout
