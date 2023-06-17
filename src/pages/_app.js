import '@/styles/globals.css'
import '../styles/globals.css'
import connectDB from './api/config/db'
import { SessionProvider } from 'next-auth/react'
export default function App({ Component, pageProps, session }) 

{
connectDB()

  return <SessionProvider session={session}>
     <Component {...pageProps} />
  </SessionProvider>
}
