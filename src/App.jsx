import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Phones from "./Pages/Phones";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import EWallet from "./Pages/EWallet";
import { Toaster } from "react-hot-toast";
export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      {/* <nav
        className="col-12 bg-dark d-flex justify-content-center align-items-center gap-5"
        style={{ height: "8vh" }}
      >
        <Link className="text-light" to="/">
          Home
        </Link>
        <Link className="text-light" to="/phones">
          CRUD
        </Link>
        <Link className="text-light" to="/login">
          login
        </Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ewallet" element={<EWallet />} />
        <Route path="*" element={<h1>404 Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
