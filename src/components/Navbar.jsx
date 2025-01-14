import React from "react";
import Logo from "./Logo";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const applyLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };

  const applyDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };

  const toggleDarkMode = (checked) => {
    setIsDarkMode(checked);
    if (checked) {
      applyDarkMode();
    } else {
      applyLightMode();
    }
  };

  React.useEffect(() => {
    isDarkMode ? applyDarkMode() : applyLightMode();
  }, [isDarkMode]);

  return (
    <div className="p-5 dark:bg-blue-500">
      <Logo />
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={40}
      />
    </div>
  );
};

export default Navbar;
