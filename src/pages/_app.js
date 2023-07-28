import '@/styles/globals.css'
import '@/styles/ShowCalendar.css'

import TurnosState from '@/context/Turnos/turnosState'
import { SessionProvider } from 'next-auth/react'
import Layout from '@/components/Layout'
export default function App({ Component, pageProps, session }) 

{
  return <SessionProvider session={session}>
    <TurnosState>
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </TurnosState>
  </SessionProvider>
}
