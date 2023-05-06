import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Nav = () => {
    return (
        <div className='bg-white'>
            <div className='flex  justify-center items-center px-3'>
                <Image src={'/assets/logo.jpeg'} width={100} height={100} alt='logo de la pagina' />
               
            </div>
            <nav className='flex justify-center gap-7 py-5'>
                    <Link href="/">Reserva tu turno</a>
                    <Link href="/servicios">Servicios</a>
                    <Link href="">Productos</a>
                </nav>
        </div>
    )
}

export default Nav