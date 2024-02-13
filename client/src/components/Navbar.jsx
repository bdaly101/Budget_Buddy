import { NavLink } from "react-router-dom";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { useState } from "react";

const NavLinks = () => {
  return (
  <>
    <NavLink to="#">Budget</NavLink>
    <NavLink to="#">Expenses</NavLink>
    <NavLink to="#">Sign Up/Login</NavLink>
  </>
  );
};

const Nav = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  };

  return (
    <>
      <nav className=" flex w-1/3 justify-end">
        <div className="w-full justify-between md:flex">
          <NavLink />
        </div>
        <div className="sm:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <IoMdClose /> : <IoIosMenu />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col items-center basis-full">
          <NavLinks/>
        </div>
      )}
    </>
  );
};

export default Nav;