"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaList } from "react-icons/fa6";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-10">
      <nav className="relative px-10 py-6 flex justify-center items-center bg-black">
        <span className="absolute left-0 ml-8 text-2xl md:text-3xl text-white">
          TASTE-TRAILS
        </span>
        <div className="hidden sm:block space-x-12 text-xl text-gray-500 font-bold">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/recipe-list?page=1" className="hover:text-white">
            Recipe
          </Link>
        </div>

        <div className="sm:hidden absolute right-0 mr-8 border-2 border-white rounded">
          <FaList
            className="m-1 text-md text-white cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        {showMenu && (
          <div className="sm:hidden absolute top-12 right-0 text-white text-center font-bold flex flex-col">
            <Link
              href="/"
              className="w-full h-full py-2 px-10 bg-black hover:bg-gray-900"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/recipe-list?page=1"
              className="w-full h-full py-2 px-10 bg-black hover:bg-gray-900"
              onClick={closeMenu}
            >
              Recipe
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
