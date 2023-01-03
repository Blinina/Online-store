import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Collection from "./components/Collection";
import ProductCard from "./components/Card";
import HomePage from "./components/accountPage/Home";
import { useEffect, useState } from "react";
import AuthProvider, { useAuth } from "./context/authContext";
import Profile from "./components/accountPage/pages/Profile";
import Bag from "./components/accountPage/pages/Bag";
import Wishlist from "./components/accountPage/pages/Wishlist";


export default function App() {


  return (
    <>
      <AuthProvider>
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
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/bag" element={<Bag />} />


                   
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </main>
        </BrowserRouter>
      </AuthProvider>

    </>
  )
}

// "eslintConfig": {
//   // "extends": [
//   //   "react-app",
//   //   "react-app/jest"
//   // ]
// },