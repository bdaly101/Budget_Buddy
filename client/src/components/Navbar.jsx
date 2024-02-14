import { NavLink } from "react-router-dom";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { useState } from "react";

const NavLinks = () => {
  return (
  <>
    <NavLink to="/budget">Budget</NavLink>
    <NavLink to="/expenses">Expenses</NavLink>
    <NavLink to="/login">Login</NavLink>
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
        <div className="hidden w-full justify-between md:flex">
          <NavLinks />
        </div>
        <div className="md:hidden text-[#2b5b88] w-10 h-auto">
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