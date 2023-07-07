import '@/styles/globals.css'
import '@/styles/ShowCalendar.css'

import TurnosState from '@/context/Turnos/turnosState'
import { SessionProvider } from 'next-auth/react'
export default function App({ Component, pageProps, session }) 

{
  return <SessionProvider session={session}>
    <TurnosState>
    <Component {...pageProps} />
    </TurnosState>
  </SessionProvider>
}
