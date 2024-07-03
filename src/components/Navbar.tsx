import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-10">
      <nav className="px-10 py-6 sm:py-4 relative flex justify-center items-center bg-black">
        <span className="absolute left-0 ml-8 md:text-3xl sm:text-2xl text-white">
          TASTE-TRAILS
        </span>
        <div className="hidden sm:flex space-x-4 text-md text-gray-500 font-bold">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/recipe-list?page=1" className="hover:text-white">
            Recipe
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
