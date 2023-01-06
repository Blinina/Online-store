import { Link } from "react-router-dom";
import women from "../assets/images/women3.jpg";
import men from "../assets/images/men7.jpg";


export default function Main() {
  return (
    <>
      <section id="header" className="header bg">
        <div className="bg">
          <div className="header-container">
            <p className="text-upper">New collection</p>
            <h1 className="main-text">Wear 2023</h1>
            <Link to="/collection/newColection" relative="path">
              <button 
              className="M-btn btn-green">Shop now</button>    
              </Link>
        </div>
        </div>
      </section>
      <section id="tree-category">
        <div className="tree-category">
          <figure>
            <Link to="/collection/women" relative="path">
              <img src={women} alt="womens" />
              <figcaption>Women’s</figcaption>
            </Link>
          </figure>
          <figure >
            <Link to="/collection/men" relative="path">
              <img src={men} alt="mens" />
              <figcaption>Men’s</figcaption>
            </Link>
          </figure>
        </div>
      </section>
      <section className="sales">
        <h2>Sales</h2>

      </section>
    </>
  );
};