import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { AuthContext } from "../provider/AuthProvider";
import { Tooltip } from "react-tooltip";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { isDarkMode, setIsDarkMode, user, setUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu

  const applyTheme = (theme) => {
    document.querySelector("body").setAttribute("data-theme", theme);
  };

  const toggleDarkMode = (checked) => {
    setIsDarkMode(checked);
    const theme = checked ? "dark" : "light";
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const handleLogout = () => {
    setUser(null); // Clear user data in state
    localStorage.removeItem("user"); // Clear user data in localStorage
    console.log("User logged out");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDarkMode(savedTheme === "dark");
    applyTheme(savedTheme);

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Restore user data into context
    }
  }, [setIsDarkMode, setUser]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Reusable links component for both desktop and mobile dropdown
  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "block px-3 py-2 text-primary"
            : "block px-3 py-2 hover:text-primary"
        }
        aria-current="page"
      >
        Home
      </NavLink>
      <NavLink
        to="/allReviews"
        className={({ isActive }) =>
          isActive
            ? "block px-3 py-2 text-primary"
            : "block px-3 py-2 hover:text-primary"
        }
      >
        All Reviews
      </NavLink>
      <NavLink
        to="/addReview"
        className={({ isActive }) =>
          isActive
            ? "block px-3 py-2 text-primary"
            : "block px-3 py-2 hover:text-primary"
        }
      >
        Add Review
      </NavLink>
      <NavLink
        to="/myReviews"
        className={({ isActive }) =>
          isActive
            ? "block px-3 py-2 text-primary"
            : "block px-3 py-2 hover:text-primary"
        }
      >
        My Reviews
      </NavLink>
      <NavLink
        to="/myWatchlist"
        className={({ isActive }) =>
          isActive
            ? "block px-3 py-2 text-primary"
            : "block px-3 py-2 hover:text-primary"
        }
      >
        Game WatchList
      </NavLink>
    </>
  );

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="container mx-auto py-5">
      <div className="flex px-5 md:flex-row justify-between items-center relative">
        {/* logo */}
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* mobile dropdown */}
        <div className="dropdown md:hidden relative">
          <div
            tabIndex={0}
            role="button"
            aria-expanded={isDropdownOpen}
            aria-controls="mobile-menu"
            className="btn m-1"
            onClick={toggleDropdown}
            onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
          >
            <GiHamburgerMenu />
          </div>
          {isDropdownOpen && (
            <ul
              id="mobile-menu"
              className="absolute top-full right-0 mt-2 dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {links}
              <div className="divider"></div>
              <div className="flex gap-4 items-center justify-center">
                <DarkModeSwitch
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                  size={20}
                  aria-label={
                    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                />
                <div>
                  {user ? (
                    <div className="relative group">
                      <img
                        className="h-10 w-10 rounded-full cursor-pointer"
                        src={user.photoURL}
                        alt={user.displayName}
                        data-tooltip-id="user-tooltip"
                      />
                      <Tooltip id="user-tooltip" clickable>
                        <p className="font-semibold">{user.displayName}</p>
                        <button
                          className="btn btn-sm btn-error mt-2"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </Tooltip>
                    </div>
                  ) : (
                    <Link to="auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  )}
                </div>
              </div>
            </ul>
          )}
        </div>

        {/* links for larger screens */}
        <div className="hidden md:block">
          <ul className="flex flex-wrap justify-center items-center text-sm">
            {links}
          </ul>
        </div>

        {/* colormode and auth for larger screens */}
        <div className="hidden md:flex gap-4 items-center justify-center">
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          />
          <div>
            {user ? (
              <div className="relative group">
                <img
                  className="h-10 w-10 rounded-full cursor-pointer"
                  src={user.photoURL}
                  alt={user.displayName}
                  data-tooltip-id="my-tooltip"
                />
                <Tooltip id="my-tooltip" clickable>
                  <div className="text-center">
                    <p className="font-semibold">{user.displayName}</p>
                    <button
                      className="btn btn-sm btn-error mt-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </Tooltip>
              </div>
            ) : (
              <Link to="auth/signup" className="text-primary">
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
