import logo from "../assets/img/logo.png";
import { IoContrast, IoFolder, IoHome, IoMenu } from "react-icons/io5";
import Overlay from "./Overlay";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav id="sidebar" className={`lg:shadow-md ${isOpen ? "" : "collapsed"}`}>
        <ul className="heading">
          <li>
            <div className="logo">
              <img src={logo} alt="Logo" loading="lazy" className="max-h-12" />
              <IoMenu className="icon" onClick={toggleSidebar} />
            </div>
          </li>
        </ul>
        <ul className="navigations">
          <li>
            <Link to="/" className="nav-link">
              <IoHome className="icon" />
              <span className="text">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/projects" className="nav-link">
              <IoFolder className="icon" />
              <span className="text">Projects</span>
            </Link>
          </li>
        </ul>

        <ul className="settings">
          <li>
            <div className="theme-toggler">
              <IoContrast className="icon" />
              <span className="text text-0">Theme</span>
            </div>
          </li>
        </ul>
      </nav>
      <Overlay onClick={closeSidebar} className="inset-0 z-6" />
    </>
  );
}
