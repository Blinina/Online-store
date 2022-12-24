import { Link } from "react-router-dom";
import logo from "../assets/images/VectorName.png";
import logoX from "../assets/images/VectorX.png";
import like from "../assets/images/Like.png";
import shop from "../assets/images/shop.png";
import user from "../assets/images/user.png";

export default function Nav() {

  return (
    <div>
      <nav className="nav-bar">
        <div>
        <Link to="/" relative="path">
          <img src={logo} alt="creater"/>
          <img src={logoX} alt="createrX"/>
          </Link>
        </div>
        <ul>
        <Link to="/collection/women" relative="path">
          Women
        </Link>
        <Link to="/collection/men" relative="path">
          Men
        </Link>
        <Link to="/kids" relative="path">
          Kids
        </Link>
        <Link to="/sales" relative="path">
          Sales
        </Link>
        </ul>
        <form>
          <input name="search"/>
          <button type="submit"></button>
        </form>
        <div>
          <div>
          <img src={like} alt="like"/>
          </div>
          <div>
          <img src={shop} alt="shop"/>
          </div>
          <div className="nav-user">
          <figure > 
            <img src={user} alt="login/logout" />
            <figcaption>login/logout</figcaption>
          </figure>
          </div>
        </div>
      </nav>
      <div className="nav-sales">Up to 70% Off. <Link to=".." relative="path">Shop our latest sale styles</Link></div>
    </div>
  );
};