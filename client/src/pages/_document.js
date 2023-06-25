import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="/styles/globals.css"
          rel="stylesheet"
        />
      </Head>
      <body className='w-full h-screen flex items-center justify-center '>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
