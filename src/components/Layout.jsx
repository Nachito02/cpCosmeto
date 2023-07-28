import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { PT_Sans } from "next/font/google";
const inter = PT_Sans({ subsets: ["latin"], weight: "400" });

const Layout = ({ children }) => {
  return (
    <div className={` bg-[#F31559] ${inter.className} `}>
      <div className="min-h-screen">
      <Nav />
      {children}

      </div>
      <Footer />

    </div>
  );
};

export default Layout;
