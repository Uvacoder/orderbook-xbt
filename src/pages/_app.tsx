import React from 'react'
import type { AppProps } from 'next/app'

// Global styles here
import '../main.scss'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}

export default MyApp
