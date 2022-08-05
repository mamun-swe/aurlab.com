import '../styles/globals.css'
import NextNprogress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress
        color="#581c87"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
