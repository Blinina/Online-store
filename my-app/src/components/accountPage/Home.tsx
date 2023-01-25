import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import Profile from "./pages/Profile"
import Wishlist from "./pages/Wishlist"
import Bag from "./bagComponents/Bag"
import AddProduct from "./pages/AddProduct"
import wishlist from "../../assets/images/Like.png"
import profile from "../../assets/images/blackUser.png"
import singOut from "../../assets/images/sing out.png"
import bag from "../../assets/images/bagMenu.png"
import newProduct from "../../assets/images/shop.png"
import { deleteAllLikeStore } from "../../store/likeSlice"
import { deleteAllProductToBasket } from "../../store/basketSlice"
import { typeAuthContent, typeLoggedIn, useAuth } from "../../context/authContext"

export default function HomePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useAuth() as typeAuthContent
  const [page, setPage] = useState({ type: "profile" })
  const { fullName, email, role } = auth.loggedIn as typeLoggedIn
  const getClass = (variant: string) => {
    return variant === page.type ? "menu-elem btn-green" : "menu-elem"
  }
  const handleLogout = () => {
    navigate("/")
    auth.logOut()
    dispatch(deleteAllLikeStore())
    dispatch(deleteAllProductToBasket())
  }
  const navArr = [
    { name: "profile", img: profile },
    { name: "bag", img: bag },
    { name: "wishlist", img: wishlist },
  ]
  return (
    <div className="pages-container">
      <div>
        <div className="menu">
          <ul>
            <li>
              <div className="menu-elem-profile">
                <p className="name-profile">{auth.loggedIn != null && fullName}</p>
                <p className="email">{auth.loggedIn != null && email}</p>
              </div>
            </li>
            {navArr.map(({ name, img }, index) => (
              <>
                <li key={name}>
                  <div
                    className={getClass(name)}
                    onClick={() => {
                      setPage({ type: name })
                    }}
                  >
                    {page.type !== name && <img src={img} alt={name} />}
                    <p>My {name}</p>
                  </div>
                </li>
                {index === 0 && role === "Seller" && (
                  <li key="AddProduct">
                    <div
                      className={getClass("AddProduct")}
                      onClick={() => {
                        setPage({ type: "AddProduct" })
                      }}
                    >
                      {page.type !== "AddProduct" && <img src={newProduct} alt="newProduct" />}
                      <p>Add product</p>
                    </div>
                  </li>
                )}
              </>
            ))}
            <li>
              <div className="menu-elem invalid" onClick={handleLogout}>
                <img src={singOut} alt="sing Out" />
                <p>Sign out</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="profile-cards">
        {page.type === "profile" && <Profile />}
        {page.type === "bag" && <Bag />}
        {page.type === "wishlist" && <Wishlist />}
        {page.type === "AddProduct" && <AddProduct />}
      </div>
    </div>
  )
}
