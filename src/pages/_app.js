import '@/styles/globals.css'
import connectDB from './api/config/db'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
