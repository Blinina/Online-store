import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { AnyAction } from "redux"
import { ThunkDispatch } from "@reduxjs/toolkit"
import SignIn from "./modalsAuth/SignIn"
import SignUp from "./modalsAuth/SignUp"
import { useAuth } from "../context/authContext"
import { getDataLike, getLike } from "../store/likeSlice"
import { getDataBasket, getBasket } from "../store/basketSlice"
import { showModal } from "../store/modalSlice"
import { RootState } from "../store/store"
import logo from "../assets/images/VectorName.png"
import like from "../assets/images/Like.png"
import shop from "../assets/images/shop.png"
import user from "../assets/images/blackUser.png"

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>

export default function Nav() {
  const navigate = useNavigate()
  const dispatch = useDispatch<TypedDispatch<RootState>>()
  const auth = useAuth()
  const sliceOpen = useSelector((state: RootState) => state.modal.show)
  const [openSignUP, setOpenSignUP] = useState(false)
  const likeCount = useSelector(getLike).flat().length
  const basketCount = useSelector(getBasket).flat().length

  useEffect(() => {
    if (auth?.loggedIn?._id) {
      dispatch(getDataLike(auth?.loggedIn?._id))
      dispatch(getDataBasket(auth?.loggedIn?._id))
    }
  }, [auth?.loggedIn?._id, dispatch])

  return (
    <>
      <div>
        <nav className="nav">
          <div className="logo">
            <Link to="/" relative="path">
              <img src={logo} alt="creater" />
            </Link>
          </div>
          <div className="nav-bar">
            <ul>
              <li>
                <Link to="/collection/women" relative="path">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/collection/men" relative="path">
                  {" "}
                  Men
                </Link>
              </li>
              <li>
                <Link to="/collection/sales" relative="path">
                  Sales
                </Link>
              </li>
              <div
                className="like-container"
                onClick={() => {
                  navigate("/wishlist")
                }}
              >
                <img src={like} alt="like" />
                <div className="like-count">{likeCount}</div>
              </div>
              <div
                className="like-container"
                onClick={() => {
                  navigate("/bag")
                }}
              >
                <img src={shop} alt="shop" />
                <div className="basket-count">{basketCount}</div>
              </div>
              <div className="nav-user">
                {auth?.getUsername() ? (
                  <figure
                    onClick={() => {
                      navigate("/home")
                    }}
                  >
                    <img src={user} alt="user" />
                    <figcaption>
                      <b
                        className={
                          (auth?.loggedIn?.fullName.length as number) > 5 ? "user-name" : ""
                        }
                      >
                        {auth?.getUsername()}
                      </b>
                      {auth?.loggedIn?.role === "Seller" && <p>{auth?.loggedIn?.role}</p>}
                    </figcaption>
                  </figure>
                ) : (
                  <figure onClick={() => dispatch(showModal())}>
                    <img src={user} alt="user" />
                    <figcaption>login/logout</figcaption>
                  </figure>
                )}
              </div>
            </ul>
          </div>
        </nav>
        <div className="nav-sales">
          Up to 70% Off.{" "}
          <Link to="/collection/sales" relative="path">
            <b> Shop our latest sale styles</b>
          </Link>
        </div>
        {sliceOpen && <SignIn setOpenSignUP={setOpenSignUP} />}
        {openSignUP && <SignUp openSignUP={openSignUP} setOpenSignUP={setOpenSignUP} />}
      </div>
    </>
  )
}
