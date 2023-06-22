import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import turnosContext from "@/context/Turnos/turnosContext";
import { signIn, signOut, useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
const Nav = () => {
  const TurnosContext = useContext(turnosContext)

  const {loading} = TurnosContext

  const [inHover, setInHover] = useState(false)
  const { data: session,} = useSession();

  const handleHover = () => { 
      setInHover(true)
   }
   const handleHoverExit = () => {
    setInHover(false);
  };
 

  return (
    <div className="bg-white " onMouseLeave={handleHoverExit}>
      <div className="flex  justify-center items-center px-3">
        <Image
          src={"/assets/logo.jpeg"}
          width={100}
          height={100}
          alt="logo de la pagina"
        />
      </div>
      <nav className="flex justify-center items-center gap-7 py-5">
        <Link href="/">Reserva tu turno</Link>
        <Link href="/servicios">Servicios</Link>
        <Link href="">Productos</Link>
        <Link href="">Carrito</Link>

        {!session ? (
          <button onClick={() => signIn('google')}>Iniciar Sesión</button>
        ) : (

          !loading ? <div className="flex items-center relative gap-2">
          <Image className="rounded-full" width={50} alt="profile" height={50} src={session.user.image} onMouseEnter={handleHover} />

          
                <div   onMouseLeave={handleHoverExit} className= {`
                flex flex-col gap-2 py-2 z-10
                 transition-all duration-500 ease-in-out overflow-hidden
                      ${inHover ?  "opacity-1" : "opacity-0 invisible"}
                absolute top-[3.5rem] w-[12rem] right-[-5rem] text-center bg-white transition-opacity duration-500`}>
                  <Link href={""}>Mi Perfil</Link>
                  <button onClick={signOut}>Cerrar session</button>
      
                </div>
        </div>

               : <ClipLoader /> 
        )}

         

      </nav>


    </div>
  );
};

export default Nav;
