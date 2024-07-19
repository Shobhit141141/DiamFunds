import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Login from "./pages/Login";
import ListFund from "./pages/Form";
import { Toaster } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import DashBoard from "./pages/Dashboard";

function App() {
	const [progress, setProgress] = useState(0);

  return (
    <div>
      <BrowserRouter>
      <LoadingBar
					color='#00B29F'
					height={4}
          shadow={true}
					progress={progress}
					onLoaderFinished={() => setProgress(0)}
				/>
      <Toaster/>
      
        <Routes>
          <Route path="/" element={<Home setProgress={setProgress}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:id" element={<Details setProgress={setProgress}/>} />
          <Route path="/list-fund" element={<ListFund setProgress={setProgress}/>} />
          <Route path="/dashboard" element={<DashBoard setProgress={setProgress}/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
