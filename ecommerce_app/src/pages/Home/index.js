import React, { useState, useEffect, useRef, useContext } from "react";
import SliderBanner from "./slider/index";
import "./style.css";
import Slider from "react-slick";

const Home = (props) => {
  var settings = {
    dots: false,
    infinite: context.windowWidth < 992 ? false : true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    fade: false,
    arrows: context.windowWidth < 992 ? false : true,
  };
  return (
    <div style={{ display: "block" }}>
      <SliderBanner />
      <section className="homeProducts homeProductWrapper">
        <div className="container-fluid">
          <div className="d-flex align-items-center homeProductsTitleWrap">
            <h2 className="hd mb-0 mt-0 res-full">Popular Products</h2>
            <ul className="list list-inline ml-auto filterTab mb-0 res-full">
              {catArray.length !== 0 &&
                catArray.map((cat, index) => {
                  return (
                    <li className="list list-inline-item">
                      <a
                        className={`cursor text-capitalize 
                                                ${
                                                  activeTabIndex === index
                                                    ? "act"
                                                    : ""
                                                }`}
                        onClick={() => {
                          setactiveTab(cat);
                          setactiveTabIndex(index);
                          productRow.current.scrollLeft = 0;
                          setIsLoadingProducts(true);
                        }}
                      >
                        {cat}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
