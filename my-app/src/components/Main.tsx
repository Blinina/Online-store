import { Link } from "react-router-dom";
import women from "../assets/images/women.png";
import men from "../assets/images/men.png";
import kids from "../assets/images/kids.png";



export default function Main() {

  return (
    <>
      <section className="header">
        <div>
          <p className="text-upper">New collection</p>
          <h1>Menswear 2020</h1>
          <div className="Mbtn-group">
            <button className="M-btn">Shop sale</button>
            <button className="M-btn btn-green">Shop the menswear</button>
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
         <figure > 
         <Link to="/kids" relative="path">
            <img src={kids} alt="kids" />
            <figcaption>Kids’</figcaption>
            </Link>
          </figure>
        </div>
      </section>
      <section className="selas">

      </section>
      <section className="trending">

      </section>


    </>
  );
};