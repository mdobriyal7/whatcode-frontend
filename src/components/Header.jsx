import React from "react";
import logo from "../assets/login/icon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import cart from "../assets/misc/cart.svg";

// const DASH_REGEX = /^\(\/)?$/
const CART_REGEX = /^\/cart(\/)?$/;
const CITY_REGEX = /^\/city(\/)?$/;
const SEATS_REGEX = /^\/seats(\/)?$/;

const Header = () => {
  const navigate = useNavigate(); // Define navigate here
  const { pathname } = useLocation();
  console.log(pathname)

  let cityButton = null;
  if (CART_REGEX.test(pathname)|| SEATS_REGEX.test(pathname)) {
    cityButton = (
      <button
        className="flex items-center mr-4 my-auto py-2.5 px-4 rounded-full text-white font-semibold text-lg"
        style={{
          background:
            "linear-gradient(98.44deg, #F5BA48 52.42%, #EC7609 104.8%, #EC008C 107.37%)",
          boxShadow: "0px 4px 4px 0px #00000040",
        }}
        onClick={()=>navigate('/city')}
      >
        City Select
        <MdLocationPin className="ml-2 text-3xl" />
      </button>
    );
  }

  let cartButton = null;
  if (SEATS_REGEX.test(pathname)|| CITY_REGEX.test(pathname)) {
    cartButton = (
      <button
        className="flex items-center mr-4 my-auto py-2 px-4 rounded-full text-white font-semibold text-lg"
        style={{
          background:
            "linear-gradient(98.44deg, #F54874 52.42%, #EC008C 107.37%)",
          boxShadow: "0px 4px 4px 0px #00000040",
        }}
        onClick={() => navigate("/cart")}
      >
        Go to Cart
        <img src={cart} className="ml-2" />
      </button>
    );
  }

  return (
    <nav className="flex h-90 bg-nav-bg justify-center relative">
      <img src={logo} alt="Logo" />

      <div className="flex items-center absolute right-0 h-full">
        {cityButton&&cityButton}{cartButton}
      </div>
    </nav>
  );
};

export default Header;
