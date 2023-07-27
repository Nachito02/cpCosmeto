import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { PT_Sans } from 'next/font/google'
const inter = PT_Sans({subsets: ['latin'], weight:'400'})


const Layout = ({children}) => {
  return (
    <div className={`min-h-screen bg-[#F31559] ${inter.className} `}>
        
        <Nav />
        {children}

        <Footer />
    </div>
  )
}

export default Layout