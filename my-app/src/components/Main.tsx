import { Link } from "react-router-dom";
import women from "../assets/images/women3.jpg";
import men from "../assets/images/men7.jpg";
import vogue from "../assets/images/vogue.jpg";
import { useRef } from "react";

export default function Main() {
  const elem = useRef();
//   function changeBgImg(){
//     console.log(elem)
//     elem.current.style.backgroundImage = `url('${vogue}')`;
// }
  return (
    <>
      <section id="header" className="header bg">
        <div className="bg" ref={elem}>
          <div className="header-container">
            <p className="text-upper">New collection</p>
            <h1 className="main-text">Menswear 2023</h1>
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
        </div>
      </section>
      <section className="sales">
        <h2>Sales</h2>

      </section>


    </>
  );
};