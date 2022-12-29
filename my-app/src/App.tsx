import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Collection from "./components/Collection";
import ProductCard from "./components/ProductCard";
import HomePage from "./components/accountPage/Home";
import { useEffect, useState } from "react";
export default function App() {

//   const callBackendAPI = async () => {
//     const response = await fetch('/women');
//     const body = await response.json();
//  console.log(body)
//     if (response.status !== 200) {
//       throw Error(body.message) 
//     }
//     return body;
//   };
//   useEffect(()=>{
//     callBackendAPI()
//   }, [])

  return (
    <>
      <BrowserRouter>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/collection" element={<Collection />}>
              <Route path=":id" element={<Collection />} />
            </Route>
            <Route path="/product" element={<ProductCard />}>
              <Route path=":id" element={<ProductCard />} />
            </Route>
            <Route path="/home" element={<HomePage />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

// "eslintConfig": {
//   // "extends": [
//   //   "react-app",
//   //   "react-app/jest"
//   // ]
// },