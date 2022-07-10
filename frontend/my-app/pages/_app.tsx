import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from '../navbar/Nav';

function MyApp({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
  return (
    <>
      {/* <Nav/> */}

    <Component {...pageProps} />
    </>
  )
}

export default MyApp
