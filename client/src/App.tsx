import React, { useContext, useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { LoginContext } from "./context/LoginContext";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path={"/"} />
          <Route element={<Signup />} path={"/auth"} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
