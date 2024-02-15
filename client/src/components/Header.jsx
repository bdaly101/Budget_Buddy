import Logo from "./Logo.jsx";
import { Link } from "react-router-dom";
import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="sticky top-0 z-[1] mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between border-b border-gray-100 bg-background p-5 font-sans font-bold uppercase text-text-primary backdrop-blur-[100px] dark:border-gray-800 dark:bg-d-background dark:text-d-text-primary">
      <Logo />
      <div className=" flex w-1/3 justify-end">
        <div className="hidden w-full justify-between md:flex">
          {Auth.loggedIn() ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/budget">Budget</Link>
            <Link to="/expenses">Expenses</Link>
            <button onClick={logout}>LOGOUT</button>
          </>
          ) : (
            <>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;