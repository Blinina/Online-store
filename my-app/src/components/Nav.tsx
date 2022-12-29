import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/VectorName.png";
import logoX from "../assets/images/VectorX.png";
import like from "../assets/images/Like.png";
import shop from "../assets/images/shop.png";
import user from "../assets/images/user.png";
import { useState } from "react";
import SignIn from "./modals/SignIn";
import SignUp from "./modals/SignUp";

export default function Nav() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openSignUP, setOpenSignUP] = useState(false);

  return (
    <div>
      <nav className="nav">
        <div className="logo">
          <Link to="/" relative="path">
            <img src={logo} alt="creater" />
            <img src={logoX} alt="createrX" />
          </Link>
        </div>
        <div className="nav-bar">
          <ul>
            <li>
              <Link to="/collection/women" relative="path">Women</Link>
            </li>
            <li>
              <Link to="/collection/men" relative="path"> Men</Link>
            </li>
            <li>
              <Link to="/kids" relative="path"> Kids</Link>
            </li>
            <li>
              <Link to="/sales" relative="path">Sales</Link>
            </li>
          </ul>
          <form>
            <input name="search" />
            <button type="submit"></button>
          </form>
          <div className="nav-account">
            <div>
              <img src={like} alt="like" />
            </div>
            <div>
              <img src={shop} alt="shop" />
            </div>
            <div className="nav-user">
              <figure onClick={() => setOpenModal(true)}>
                <img src={user} alt="login/logout" />
                <figcaption>login/logout</figcaption>
              </figure>
              {/* <figure onClick={() => navigate('/home')}>
                <img src={user} alt="login/logout" />
                <figcaption>login/logout</figcaption>
              </figure> */}
            </div>
          </div>
        </div>
      </nav>
      <div className="nav-sales">Up to 70% Off. <Link to=".." relative="path">Shop our latest sale styles</Link></div>
      {openModal && <SignIn open={openModal} setOpenModal={setOpenModal} setOpenSignUP={setOpenSignUP} />}
      {openSignUP && <SignUp openSignUP={openSignUP} setOpenSignUP={setOpenSignUP} setOpenModal={setOpenModal} />}

    </div>
  );
};