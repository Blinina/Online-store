import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Collection from "./components/Collection";

export default function App() {

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
              {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}