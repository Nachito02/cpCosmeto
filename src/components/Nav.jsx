import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import turnosContext from "@/context/Turnos/turnosContext";
import { signIn, signOut, useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { AiOutlineShoppingCart } from "react-icons/ai";
const Nav = () => {
  const TurnosContext = useContext(turnosContext);

  const { loading } = TurnosContext;

  const [isOpen, setIsModalOpen] = useState();

  const [inHover, setInHover] = useState(false);
  const { data: session } = useSession();
  const openModal = () => {
    setIsModalOpen(!isOpen);
  };
  const handleHover = () => {
    setInHover(true);
  };
  const handleHoverExit = () => {
    setInHover(false);
  };

  return (
    <div
      className="bg-white flex justify-between lg:items-center lg:justify-between md:px-36 "
      onMouseLeave={handleHoverExit}
    >
      <div className="w-full lg:w-auto">
        <div className="flex justify-between w-full">
          <div>
            <Image
              className="mix-blend-multiply brightness-[1.1]"
              src={"/assets/logo.jpeg"}
              width={100}
              height={100}
              alt="logo de la pagina"
            />
          </div>
          <button
            onClick={openModal}
            className="flex items-center justify-center p-2 lg:hidden "
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <nav className="lg:flex justify-center items-center gap-7 py-5 hidden">
        <Link href="/">Reserva tu turno</Link>
        <Link href="/servicios">Servicios</Link>
        <Link href="/">Productos</Link>
        <Link href="" className="flex items-center gap-2">
          Carrito <AiOutlineShoppingCart size={20} />
        </Link>

        {!session ? (
          <button onClick={() => signIn("google")}>Iniciar Sesión</button>
        ) : !loading ? (
          <div className="flex items-center relative gap-2">
            <Image
              className="rounded-full"
              width={50}
              alt="profile"
              height={50}
              src={session.user.image}
              onMouseEnter={handleHover}
            />
            <div
              onMouseLeave={handleHoverExit}
              className={`
                flex flex-col gap-2 py-2 z-10
                 transition-all duration-500 ease-in-out overflow-hidden
                      ${inHover ? "opacity-1" : "opacity-0 invisible"}
                absolute top-[3.5rem] w-[12rem] right-[-5rem] text-center bg-white transition-opacity duration-500`}
            >
              <Link href={""}>Mi Perfil</Link>
              <button onClick={signOut}>Cerrar session</button>
            </div>
          </div>
        ) : (
          <ClipLoader />
        )}
      </nav>

      <nav
        className={`flex flex-col justify-center items-center gap-7 py-5  transition-all duration-300 ${
          isOpen ? "translate-y-0 h-full" : "translate-y-96 h-0 hidden"
        }`}
      >
        <Link href="/">Reserva tu turno</Link>
        <Link href="/servicios">Servicios</Link>
        <Link href="">Productos</Link>
        <Link href="">Carrito</Link>

        {!session ? (
          <button onClick={() => signIn("google")}>Iniciar Sesión</button>
        ) : !loading ? (
          <div className="flex items-center relative gap-2">
            <Image
              className="rounded-full"
              width={50}
              alt="profile"
              height={50}
              src={session.user.image}
              onMouseEnter={handleHover}
            />
            <div
              onMouseLeave={handleHoverExit}
              className={`
                    flex flex-col gap-2 py-2 z-10
                    transition-all duration-500 ease-in-out overflow-hidden
                    ${inHover ? "opacity-1" : "opacity-0 invisible"}
                    absolute top-[3.5rem] w-[12rem] right-[-5rem] text-center bg-white transition-opacity duration-500`}
            >
              <Link href={""}>Mi Perfil</Link>
              <button onClick={signOut}>Cerrar sesión</button>
            </div>
          </div>
        ) : (
          <ClipLoader />
        )}
      </nav>
    </div>
  );
};

export default Nav;
