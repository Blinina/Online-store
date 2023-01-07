import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/VectorName.png";
import logoX from "../assets/images/VectorX.png";
import like from "../assets/images/Like.png";
import shop from "../assets/images/shop.png";
import user from "../assets/images/blackUser.png";
import { useEffect, useState } from "react";
import SignIn from "./modals/SignIn";
import SignUp from "./modals/SignUp";
import { useAuth } from "../context/authContext";
import { getDataLike, getLike } from "../store/likeSlice";
import { useDispatch, useSelector } from 'react-redux';
import { getDataBasket, getBasket} from "../store/basketSlice";
export default function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [openSignUP, setOpenSignUP] = useState(false);
  useEffect(() => {
    // if(auth?.loggedIn){
    dispatch(getDataLike(auth?.loggedIn?._id))
    dispatch(getDataBasket(auth?.loggedIn?._id))

    // }else{
    //   dispatch(getDataLike(localStorage.getItem('root')))
    // }
  }, [])
  const likeCount = useSelector(getLike).flat().length;
  const basketCount = useSelector(getBasket).flat().length;
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
              <Link to="/collection/sales" relative="path">Sales</Link>
            </li>
          </ul>
          <div className="nav-account">
            <div className="like-container" onClick={() => navigate("/wishlist")}>
              <img src={like} alt="like" />
              <div className="like-count">{likeCount}</div>
            </div>
            <div>
            <div className="like-container" onClick={() => navigate("/bag")}>
                <img src={shop} alt="shop" />
                <div className="basket-count">{basketCount}</div>
            </div>
            </div>
            <div className="nav-user">
              {auth?.getUsername()
                ?
                <figure onClick={() => navigate('/home')}>
                  <img src={user} alt="user" />
                  <figcaption><b>{auth?.getUsername()}</b>{auth?.loggedIn?.role === 'Seller' && <p>{auth?.loggedIn?.role}</p>}</figcaption>
                </figure>
                :
                <figure onClick={() => setOpenModal(true)}>
                  <img src={user} alt="user" />
                  <figcaption>login/logout</figcaption>
                </figure>
              }
            </div>
          </div>
        </div>
      </nav>
      <div className="nav-sales">Up to 70% Off. <Link to="/collection/sales" relative="path"><b> Shop our latest sale styles</b></Link></div>
      {openModal && <SignIn open={openModal} setOpenModal={setOpenModal} setOpenSignUP={setOpenSignUP} />}
      {openSignUP && <SignUp openSignUP={openSignUP} setOpenSignUP={setOpenSignUP} setOpenModal={setOpenModal} />}
    </div>
  );
};