import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Slider from "react-slick";
import { useRef } from "react";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect } from "react";
import { Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

import Product from "../../components/product";
import axios from "axios";
import { MyContext } from "../../App";

const DetailsPage = (props) => {
  const [zoomInage, setZoomImage] = useState(
    "https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-0-202305292130.jpg"
  );

  const [bigImageSize, setBigImageSize] = useState([1500, 1500]);
  const [smlImageSize, setSmlImageSize] = useState([150, 150]);

  const [activeSize, setActiveSize] = useState(0);

  const [inputValue, setinputValue] = useState(1);

  const [activeTabs, setActiveTabs] = useState(0);

  const [currentProduct, setCurrentProduct] = useState({});
  const [isAdded, setIsadded] = useState(false);

  const context = useContext(MyContext);

  const [prodCat, setProdCat] = useState({
    parentCat: sessionStorage.getItem("parentCat"),
    subCatName: sessionStorage.getItem("subCatName"),
  });

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [rating, setRating] = useState(0.0);

  const [reviewsArr, setReviewsArr] = useState([]);

  const [isAlreadyAddedInCart, setisAlreadyAddedInCart] = useState(false);

  const [reviewFields, setReviewFields] = useState({
    review: "",
    userName: "",
    rating: 0.0,
    productId: 0,
    date: "",
  });

  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  let { id } = useParams();

  var settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    fade: false,
    arrows: context.windowWidth > 992 ? true : false,
  };

  var related = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    fade: false,
    arrows: context.windowWidth > 992 ? true : false,
  };

  const goto = (index) => {
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

  const isActive = (index) => {
    setActiveSize(index);
  };

  const plus = () => {
    setinputValue(inputValue + 1);
  };

  const minus = () => {
    if (inputValue !== 1) {
      setinputValue(inputValue - 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    props.data.length !== 0 &&
      props.data.map((item) => {
        item.items.length !== 0 &&
          item.items.map((item_) => {
            item_.products.length !== 0 &&
              item_.products.map((product) => {
                if (parseInt(product.id) === parseInt(id)) {
                  setCurrentProduct(product);
                }
              });
          });
      });

    //related products code

    const related_products = [];

    props.data.length !== 0 &&
      props.data.map((item) => {
        if (prodCat.parentCat === item.cat_name) {
          item.items.length !== 0 &&
            item.items.map((item_) => {
              if (prodCat.subCatName === item_.cat_name) {
                item_.products.length !== 0 &&
                  item_.products.map((product, index) => {
                    if (product.id !== parseInt(id)) {
                      related_products.push(product);
                    }
                  });
              }
            });
        }
      });

    if (related_products.length !== 0) {
      setRelatedProducts(related_products);
    }

    showReviews();

    getCartData("http://localhost:5000/cartItems");
  }, [id]);

  const changeInput = (name, value) => {
    if (name === "rating") {
      setRating(value);
    }
    setReviewFields(() => ({
      ...reviewFields,
      [name]: value,
      productId: id,
      date: new Date().toLocaleString(),
    }));
  };

  const reviews_Arr = [];

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:5000/productReviews", reviewFields)
        .then((response) => {
          reviews_Arr.push(response.data);
          setReviewFields(() => ({
            review: "",
            userName: "",
            rating: 0.0,
            productId: 0,
            date: "",
          }));
        });
    } catch (error) {
      console.log(error.message);
    }

    showReviews();
  };

  var reviews_Arr2 = [];
  const showReviews = async () => {
    try {
      await axios
        .get("http://localhost:5000/productReviews")
        .then((response) => {
          if (response.data.length !== 0) {
            response.data.map((item) => {
              if (parseInt(item.productId) === parseInt(id)) {
                reviews_Arr2.push(item);
              }
            });
          }
        });
    } catch (error) {
      console.log(error.message);
    }

    if (reviews_Arr2.length !== 0) {
      setReviewsArr(reviews_Arr2);
    }
  };

  const addToCart = (item) => {
    context.addToCart(item);
    setIsadded(true);
  };

  const getCartData = async (url) => {
    try {
      await axios.get(url).then((response) => {
        response.data.length !== 0 &&
          response.data.map((item) => {
            if (parseInt(item.id) === parseInt(id)) {
              setisAlreadyAddedInCart(true);
            }
          });
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {context.windowWidth < 992 && (
        <Button
          className={`btn-g btn-lg w-100 filterBtn {isAlreadyAddedInCart===true && 'no-click'}`}
          onClick={() => addToCart(currentProduct)}
        >
          <ShoppingCartOutlinedIcon />
          {isAdded === true || isAlreadyAddedInCart === true
            ? "Added"
            : "Add To Cart"}
        </Button>
      )}

      <section className="detailsPage mb-5">
        {context.windowWidth > 992 && (
          <div className="breadcrumbWrapper mb-4">
            <div className="container-fluid">
              <ul className="breadcrumb breadcrumb2 mb-0">
                <li>
                  <Link>Home</Link>{" "}
                </li>
                <li>
                  <Link
                    to={`/cat/${prodCat.parentCat
                      .split(" ")
                      .join("-")
                      .toLowerCase()}`}
                    onClick={() =>
                      sessionStorage.setItem(
                        "cat",
                        prodCat.parentCat.split(" ").join("-").toLowerCase()
                      )
                    }
                    className="text-capitalize"
                  >
                    {prodCat.parentCat}
                  </Link>{" "}
                </li>

                <li>
                  <Link
                    to={`/cat/${prodCat.parentCat.toLowerCase()}/${prodCat.subCatName
                      .replace(/\s/g, "-")
                      .toLowerCase()}`}
                    onClick={() =>
                      sessionStorage.setItem(
                        "cat",
                        prodCat.subCatName.toLowerCase()
                      )
                    }
                    className="text-capitalize"
                  >
                    {prodCat.subCatName}
                  </Link>{" "}
                </li>
                <li>{currentProduct.productName}</li>
              </ul>
            </div>
          </div>
        )}

        <div className="container detailsContainer pt-3 pb-3">
          <div className="row">
            {/* productZoom code start here */}
            <div className="col-md-5">
              <div className="productZoom">
                <Slider
                  {...settings2}
                  className="zoomSliderBig"
                  ref={zoomSliderBig}
                >
                  {currentProduct.productImages !== undefined &&
                    currentProduct.productImages.map((imgUrl, index) => {
                      return (
                        <div className="item">
                          <InnerImageZoom
                            zoomType="hover"
                            zoomScale={1}
                            src={`${imgUrl}?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                          />
                        </div>
                      );
                    })}
                </Slider>
              </div>

              <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
                {currentProduct.productImages !== undefined &&
                  currentProduct.productImages.map((imgUrl, index) => {
                    return (
                      <div className="item">
                        <img
                          src={`${imgUrl}?im=Resize=(${smlImageSize[0]},${smlImageSize[1]})`}
                          className="w-100"
                          onClick={() => goto(index)}
                        />
                      </div>
                    );
                  })}
              </Slider>
            </div>
            {/* productZoom code ends here */}

            {/* product info code start here */}
            <div className="col-md-7 productInfo">
              <h1>{currentProduct.productName}</h1>
              <div className="d-flex align-items-center mb-4 mt-3">
                <Rating
                  name="half-rating-read"
                  value={parseFloat(currentProduct.rating)}
                  precision={0.5}
                  readOnly
                />
                <span className="text-light ml-2">(32 reviews)</span>
              </div>

              <div className="priceSec d-flex align-items-center mb-3">
                <span className="text-g priceLarge">
                  Rs {currentProduct.price}
                </span>
                <div className="ml-3 d-flex flex-column">
                  <span className="text-org">
                    {currentProduct.discount}% Off
                  </span>
                  <span className="text-light oldPrice">
                    Rs {currentProduct.oldPrice}
                  </span>
                </div>
              </div>

              <p>{currentProduct.description}</p>

              {currentProduct.weight !== undefined &&
                currentProduct.weight.length !== 0 && (
                  <div className="productSize d-flex align-items-center">
                    <span>Size / Weight:</span>
                    <ul className="list list-inline mb-0 pl-4">
                      {currentProduct.weight.map((item, index) => {
                        return (
                          <li className="list-inline-item">
                            <a
                              className={`tag ${
                                activeSize === index ? "active" : ""
                              }`}
                              onClick={() => isActive(index)}
                            >
                              {item}g
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

              {currentProduct.RAM !== undefined &&
                currentProduct.RAM.length !== 0 && (
                  <div className="productSize d-flex align-items-center">
                    <span>RAM:</span>
                    <ul className="list list-inline mb-0 pl-4">
                      {currentProduct.RAM.map((RAM, index) => {
                        return (
                          <li className="list-inline-item">
                            <a
                              className={`tag ${
                                activeSize === index ? "active" : ""
                              }`}
                              onClick={() => isActive(index)}
                            >
                              {RAM} GB
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

              {currentProduct.SIZE !== undefined &&
                currentProduct.SIZE.length !== 0 && (
                  <div className="productSize d-flex align-items-center">
                    <span>SIZE:</span>
                    <ul className="list list-inline mb-0 pl-4">
                      {currentProduct.SIZE.map((SIZE, index) => {
                        return (
                          <li className="list-inline-item">
                            <a
                              className={`tag ${
                                activeSize === index ? "active" : ""
                              }`}
                              onClick={() => isActive(index)}
                            >
                              {SIZE}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  {context.windowWidth > 992 && (
                    <Button
                      className={`btn-g btn-lg addtocartbtn ${
                        isAlreadyAddedInCart === true && "no-click"
                      }`}
                      onClick={() => addToCart(currentProduct)}
                    >
                      <ShoppingCartOutlinedIcon />
                      {isAdded === true || isAlreadyAddedInCart === true
                        ? "Added"
                        : "Add To Cart"}
                    </Button>
                  )}
                  <Button className=" btn-lg addtocartbtn  ml-3  wishlist btn-border">
                    <FavoriteBorderOutlinedIcon />{" "}
                  </Button>
                  <Button className=" btn-lg addtocartbtn ml-3 btn-border">
                    <CompareArrowsIcon />
                  </Button>
                </div>
              </div>
            </div>
            {/* product info code ends here */}
          </div>
          </div>
      </section>
    </>
  );
};

export default DetailsPage;
