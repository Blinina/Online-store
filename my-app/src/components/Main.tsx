import { useNavigate } from "react-router-dom";
import women from "../assets/images/women.jpg";
import men from "../assets/images/men.jpg";

export default function Main() {
  const navigate = useNavigate();
  return (
    <>
      <section id="header" className="header bg">
        <div className="bg">
          <div className="header-container">
            <p className="text-upper">New collection</p>
            <h1 className="main-text">Wear 2023</h1>
            <button
              className="M-btn btn-green"
              onClick={() => navigate("/collection/newColection")}
            >
              Shop now
            </button>
          </div>
        </div>
      </section>
      <section id="tree-category">
        <div className="tree-category">
          <figure onClick={() => navigate("/collection/women")}>
            <img src={women} alt="womens" />
            <figcaption>Women’s</figcaption>
          </figure>
          <figure onClick={() => navigate("/collection/men")}>
            <img src={men} alt="mens" />
            <figcaption>Men’s</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
