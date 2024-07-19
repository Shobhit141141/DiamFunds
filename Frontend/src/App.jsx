import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Login from "./pages/Login";
import ListFund from "./pages/Form";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Toaster/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/list-fund" element={<ListFund />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
