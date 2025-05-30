import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import Overlay from "./Overlay";
import logo from "../assets/img/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-slate-100 shadow-md">
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
          <a href="#" onClick={closeMenu}>
            Home
          </a>
          <a href="#" onClick={closeMenu}>
            About
          </a>
          <a href="#" onClick={closeMenu}>
            Projects
          </a>
          <a href="#" onClick={closeMenu}>
            Contact
          </a>
        </nav>
        <Overlay className="inset-[4rem_0_0_0]" onClick={closeMenu} />
      </Container>
    </header>
  );
}
