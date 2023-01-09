import {
  BrowserRouter,
  Route,
  Routes, Navigate, useLocation, Outlet,
} from "react-router-dom";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Collection from "./components/Collection";
import ProductCard from "./components/Card";
import HomePage from "./components/accountPage/Home";
import { useEffect, useState } from "react";
import AuthProvider, { typeLoggedIn, useAuth } from "./context/authContext";



export default function App() {
  localStorage.setItem('root', '1');

  function LoggedInRouter() {
    const auth = useAuth();
    return auth?.loggedIn ? <Navigate to="/" /> : <Outlet />;
  }

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
              <Route path="/home" element={<LoggedInRouter />} >
                <Route path="" element={<HomePage />} />
              </Route>
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