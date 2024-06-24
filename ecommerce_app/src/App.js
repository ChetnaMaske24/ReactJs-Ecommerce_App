import React, { useEffect, useState, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/Home/index";
import About from "./pages/About/index";
import Listing from "./pages/Listing";
import NotFound from "./pages/NotFound";
import DetailsPage from "./pages/Details";
import axios from "axios";
import Loader from "./assets/images/loading.gif";

import data from "./data";

const MyContext = createContext();

function App() {
  const [productData, setProductData] = useState([]);

  const [isLoading, setIsloading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // getData('http://localhost:5000/productData');

    const is_Login = localStorage.getItem("isLogin");
    setIsLogin(is_Login);

    setTimeout(() => {
      setProductData(data[1]);
      setIsloading(false);
    }, 3000);
  }, []);

  return (
    data.productData.length !== 0 && (
      <BrowserRouter>
        <MyContext.Provider value={value}>
          {isLoading === true && (
            <div className="loader">
              <img src={Loader} />
            </div>
          )}

          <Header data={data.productData} />
          <Routes>
            <Route
              exact={true}
              path="/"
              element={<Home data={data.productData} />}
            />
            <Route
              exact={true}
              path="/cat/:id"
              element={<Listing data={data.productData} single={true} />}
            />
            <Route
              exact={true}
              path="/cat/:id/:id"
              element={<Listing data={data.productData} single={false} />}
            />
            <Route
              exact={true}
              path="/product/:id"
              element={<DetailsPage data={data.productData} />}
            />
            <Route exact={true} path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>
    )
  );
}

export default App;

export { MyContext };
