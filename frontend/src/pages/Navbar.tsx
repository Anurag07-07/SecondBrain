import { useState } from "react";
import { Link } from "react-router-dom";
import brain from "../assets/brain-illustration-12-svgrepo-com.svg";
import LogoutButton from "../Components/LogoutButton";
import ToogleButton from "../Components/ToogleButton";
import { MdMenu, MdClose } from "react-icons/md";

const NavItems = ["home", "about", "create"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-black shadow-sm shadow-gray-300 dark:shadow-gray-700  top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3 lg:px-0">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={brain} className="w-10" alt="logo" />
          <div className="text-2xl lg:text-3xl lg:font-light font-semibold text-black dark:text-white">
            YOUR IDEA
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex lg:justify-center lg:itemc gap-10 text-gray-500 dark:text-gray-400 text-lg font-light">
          {NavItems.map((item) => (
            <Link
              key={item}
              className="hover:text-black dark:hover:text-white transition-colors"
              to={`/${item}`}
            >
              {item.toUpperCase()}
            </Link>
          ))}
          <LogoutButton />
          <ToogleButton />
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden">
          <button
            className="text-3xl text-black dark:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col items-center gap-6 py-6 bg-white dark:bg-black text-gray-600 dark:text-gray-300 text-lg font-light shadow-md animate-fadeIn">
          {NavItems.map((item) => (
            <Link
              key={item}
              className="hover:text-black dark:hover:text-white transition-colors"
              to={`/${item}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.toUpperCase()}
            </Link>
          ))}
          <LogoutButton />
          <ToogleButton />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
