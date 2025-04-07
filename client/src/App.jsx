import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Singup from "./pages/Singup";
import SingIn from "./pages/SingIn";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SingIn />} />
        <Route path="/register" element={<Singup />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
