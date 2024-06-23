import React, { useEffect, useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import './responsive.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/Home/index';
import Listing from './pages/Listing';
import NotFound from './pages/NotFound';
import DetailsPage from './pages/Details';


function App() {

  return (
    
    data.productData.length !== 0 &&
    <BrowserRouter>
        <Header data={data.productData} />
        <Routes>
          <Route exact={true} path="/" element={<Home data={data.productData} />} />
          <Route exact={true} path="/cat/:id" element={<Listing data={data.productData} single={true} />} />
          <Route exact={true} path="/cat/:id/:id" element={<Listing data={data.productData} single={false} />} />
          <Route exact={true} path="/product/:id" element={<DetailsPage data={data.productData} />} />
          <Route exact={true} path="*" element={<NotFound />} />
        </Routes>
       <Footer/>
    </BrowserRouter>
  );
}

export default App;
