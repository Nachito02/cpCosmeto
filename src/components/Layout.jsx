import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { Ubuntu } from 'next/font/google'
const inter = Ubuntu({subsets: ['latin'], weight:'400'})
const Layout = ({children}) => {
  return (
    <div className={`min-h-screen bg-[#FBA1B7] ${inter.className} `}>
        
        <Nav />
        {children}

        <Footer />
    </div>
  )
}

export default Layout