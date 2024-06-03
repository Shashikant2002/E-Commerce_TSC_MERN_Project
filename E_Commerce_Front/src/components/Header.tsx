import { FormEvent, useState } from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { IoMdCall, IoMdSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";
import axios from "axios";
import { logoutSuccess } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { RootState } from "../redux/store";

const Header = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const [afLoginProfile, setAfLoginProfile] = useState(false);
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.userSlice);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/products?search=${search}`);
    setOpenSearch(false);
  };

  const logoutFunction = async () => {
    try {
      const url: string = `${baseUrl}/api/v1/user_logout`;

      const res = await axios.get(url, { withCredentials: true });
      if (res.data.success) {
        dispatch(logoutSuccess());
        toast.success("Logout Successfull !!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
      <div className="upperHeader">
        <div className="container flex justifyContentBetween">
          <div className="contact">
            <p className="flex alignCenter">
              <IoMdCall /> <a href="tel:+919643510696">+91&nbsp;9643510696</a>
            </p>
          </div>
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
      <div className="mainHeader container flex alignCenter justifyContentBetween">
        <div className="logo">
          <h2>Logo</h2>
        </div>
        <nav>
          <ul className="flex alignCenter">
            <li>
              <b>
                <NavLink to="/">Home</NavLink>
              </b>
            </li>
            <li>
              <b>
                <NavLink to="/products">Products</NavLink>
              </b>
            </li>
            <li>
              <b>
                <NavLink to="/about">About</NavLink>
              </b>
            </li>
            <li>
              <b>
                <NavLink to="/contact">Contact</NavLink>
              </b>
            </li>
            <li className="searchBox">
              <div className="se">
                <button
                  className="globalBtn_2"
                  onClick={() => {
                    setOpenSearch((prev) => !prev);
                  }}
                >
                  {openSearch ? <IoClose /> : <IoMdSearch />}
                </button>
                <div className={`search ${openSearch ? "active" : ""}`}>
                  <form onSubmit={submitSearch}>
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      type="text"
                      placeholder="Search Here...."
                    />
                    <button type="submit">
                      <IoMdSearch />
                    </button>
                  </form>
                </div>
              </div>
            </li>
            <li className="cart_box">
              <button
                className="globalBtn_2"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <MdOutlineShoppingCart />
              </button>
              <p>02</p>
            </li>
            {!userData?.auth ? (
              <li>
                <button
                  onClick={() => navigate("/login_register")}
                  className="globalBtn"
                >
                  Login/Register
                </button>
              </li>
            ) : (
              <li className="afterLogin">
                <button onClick={() => setAfLoginProfile((prev) => !prev)}>
                  <img src="/noimage.png" alt="" />
                </button>

                <ul className={`mainMenu ${afLoginProfile ? "active" : ""}`}>
                  <li>
                    <a
                      onClick={() => setAfLoginProfile((prev) => !prev)}
                      href="/my_profile"
                    >
                      My Profile
                    </a>
                  </li>

                  <li>
                    <a
                      onClick={() => {
                        setAfLoginProfile((prev) => !prev);
                        navigate("/orders");
                      }}
                      href="javascript:void(0)"
                    >
                      My Orders
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setAfLoginProfile((prev) => !prev);
                        logoutFunction();
                      }}
                      href="javascript:void(0)"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
