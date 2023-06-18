import React from 'react'
import Nav from './Nav'
import Footer from './Footer/Footer'
import { Ubuntu } from 'next/font/google'
const inter = Ubuntu({subsets: ['latin'], weight:'400'})
const Layout = ({children}) => {
  return (
    <div className={`min-h-screen bg-pink-500 ${inter.className} `}>
        
        <Nav />
        {children}

        <Footer />
    </div>
  )
}

export default Layout