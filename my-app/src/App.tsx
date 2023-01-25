import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Main from "./components/Main"
import Nav from "./components/Nav"
import Collection from "./components/products/Collection"
import ProductCard from "./components/products/Card"
import HomePage from "./components/accountPage/Home"
import AuthProvider, { useAuth } from "./context/authContext"
import Bag from "./components/accountPage/bagComponents/Bag"
import Wishlist from "./components/accountPage/pages/Wishlist"
import { ToastifyProvider } from "./context/toastContext"

export default function App() {
  localStorage.setItem("root", "1")

  function LoggedInRouter() {
    const auth = useAuth()
    return auth?.loggedIn?._id ? <HomePage /> : <Navigate to="/" />
  }

  return (
    <>
      <AuthProvider>
        <ToastifyProvider>
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
                <Route path="/home" element={<LoggedInRouter />}>
                  <Route path="/home" element={<HomePage />} />
                </Route>
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/bag" element={<Bag />} />
              </Routes>
            </main>
          </BrowserRouter>
        </ToastifyProvider>
      </AuthProvider>
    </>
  )
}
