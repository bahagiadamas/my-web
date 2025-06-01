import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Container from "./Container";
import Overlay from "./Overlay";
import logo from "../assets/img/logo.png";
import ThemeController from "./ThemeController";

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <header className="bg-base-200 shadow-md">
      <Container>
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" className="max-h-16 p-2" />
        </Link>
        <div className="menu-bar">
          <IoMenu
            className="icon menu-icon"
            tabIndex={0}
            onClick={toggleMenu}
          />
        </div>
        <nav id="navbar" className={`${isOpen ? "open" : ""}`}>
          <a href="/#hero" onClick={closeMenu}>
            Home
          </a>
          <a href="/#about" onClick={closeMenu}>
            About
          </a>
          <a href="/#feature" onClick={closeMenu}>
            Projects
          </a>
          <a href="/#contact" onClick={closeMenu}>
            Contact
          </a>
          <div
            className="tooltip tooltip-bottom tooltip-primary"
            data-tip="Switch Theme"
          >
            <ThemeController />
          </div>
        </nav>
        <Overlay className="inset-[4rem_0_0_0]" onClick={closeMenu} />
      </Container>
    </header>
  );
}
