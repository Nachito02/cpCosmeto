import React from 'react'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
const Layout = ({children}) => {
  return (
    <div className='min-h-screen bg-pink-500'>
        
        <Nav />
        {children}

        <Footer />
    </div>
  )
}

export default Layout