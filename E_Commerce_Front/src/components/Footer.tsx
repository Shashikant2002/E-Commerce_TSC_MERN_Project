import React from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer commonSection">
      <div className="container">
        <div className="parts flex">
          <div className="part">
            <div className="logo">
              <h2>Shashikant</h2>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat,
              itaque? Sit reprehenderit porro accusantium aliquam quidem,
            </p>
          </div>
          <div className="part">
            <h4 className="title">Quick Links</h4>
            <ul className="links">
              <li>
                <Link to={"/"}>
                  <h5>Home</h5>
                </Link>
              </li>
              <li>
                <Link to={"/"}>
                  <h5>About</h5>
                </Link>
              </li>
              <li>
                <Link to={"/"}>
                  <h5>Products</h5>
                </Link>
              </li>
            </ul>
          </div>
          <div className="part">
            <h4 className="title">Information</h4>
            <ul className="links">
              <li>
                <Link to={"/"}>
                  <h5>Contact</h5>
                </Link>
              </li>
              <li>
                <Link to={"/"}>
                  <h5>Terms & Conditions</h5>
                </Link>
              </li>
              <li>
                <Link to={"/"}>
                  <h5>Privacy Policy</h5>
                </Link>
              </li>
            </ul>
          </div>
          <div className="part">
            <h4 className="title">Socal Links</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat,
              itaque? Sit reprehenderit
            </p>
            <div className="socal">
              <ul className="flex">
                <li>
                  <a href="/">
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <FaLinkedinIn />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <GrInstagram />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <FaGithub />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright flex justifyContentCenter">
        <h5>Copyright by Shashikant 2024</h5>


      </div>
    </footer>
  );
};

export default Footer;
