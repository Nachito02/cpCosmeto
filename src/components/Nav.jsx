import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  console.log(session)
  return (
    <div className="bg-white">
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

        {session ? (
          <div className="flex items-center gap-2">
            {/* <Image className="rounded-full" width={100} alt="profile" height={100} src={session.user.image} /> */}
            {/* <p>{session.user.name}</p> */}
          <button onClick={signOut}>Cerrar session</button>

          </div>
        ) : (
          <button onClick={() => signIn('google')}>Iniciar Sesión</button>
        )}
      </nav>
    </div>
  );
};

export default Nav;
