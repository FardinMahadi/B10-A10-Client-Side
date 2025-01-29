import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { AuthContext } from "../provider/AuthProvider";
import { Tooltip } from "react-tooltip";
import { GiHamburgerMenu } from "react-icons/gi";
import { getAuth, signOut } from "firebase/auth";
import defaultUserImg from "../../src/assets/user.png";

const Navbar = () => {
  const auth = getAuth();
  const { isDarkMode, setIsDarkMode, user, setUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Apply theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setIsDarkMode(savedTheme === "dark");
    applyTheme(savedTheme);
  }, []);

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
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("User Logged Out");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const navLinkClass = ({ isActive }) =>
    `block px-3 py-2 transition-colors hover:text-primary ${
      isActive ? "text-primary font-semibold" : ""
    }`;

  const links = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/allReviews" className={navLinkClass}>
        All Reviews
      </NavLink>
      {user && (
        <>
          <NavLink to="/addReview" className={navLinkClass}>
            Add Review
          </NavLink>
          <NavLink to="/myReviews" className={navLinkClass}>
            My Reviews
          </NavLink>
          <NavLink to="/myWatchlist" className={navLinkClass}>
            Game Watchlist
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div
      className={`container mx-auto py-8 bg-gradient-to-b ${
        isDarkMode ? "from-gray-700 to-[#1D232A]" : "from-gray-300 to-white"
      }`}
    >
      <div className="flex px-5 md:flex-row justify-between items-center relative">
        <Link to="/">
          <Logo />
        </Link>
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
            <ul className="absolute top-full right-0 mt-2 bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {links}
              <div className="divider"></div>
              <div className="flex gap-4 items-center justify-center">
                <DarkModeSwitch
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                  size={20}
                />
                {user ? (
                  <div className="relative">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.photoURL || defaultUserImg}
                      alt={user.displayName}
                      data-tooltip-id="my-tooltip"
                    />
                    <Tooltip id="my-tooltip">
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
                  <Link to="/auth/signup" className="text-primary">
                    Sign Up
                  </Link>
                )}
              </div>
            </ul>
          )}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex">{links}</ul>
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
          />
          {user ? (
            <div className="relative">
              <img
                className="h-10 w-10 rounded-full"
                src={user.photoURL || defaultUserImg}
                alt={user.displayName}
                data-tooltip-id="my-tooltip"
              />
              <Tooltip id="my-tooltip">
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
            <Link to="/auth/signup" className="text-primary">
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
