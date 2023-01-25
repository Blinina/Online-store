import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import Cards from "../../products/Cards"
import { getLike } from "../../../store/likeSlice"

export default function Wishlist() {
  const getLikes = useSelector(getLike)
  const { pathname } = useLocation()
  const items = getLikes.map(({ product }) => product)
  return (
    <div className={pathname === "/wishlist" ? "mb-30 wishlist" : ""}>
      <div>
        <h2 className="home-title">My wishlist</h2>
      </div>
      <div>
        {items.length > 0 ? (
          <Cards items={items} />
        ) : (
          <h4 className="text-center">Your wishlist is empty</h4>
        )}
      </div>
    </div>
  )
}
