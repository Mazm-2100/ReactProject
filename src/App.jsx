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
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/ewallet" element={<EWallet />} />
        <Route path="*" element={<h1>404 Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
