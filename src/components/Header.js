import React, { useState, useContext } from "react";
import { logo } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux"

function Header() {
  const [buttonName, setButtonName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  const data = useContext(UserContext);
  console.log("🚀 ~ Header ~ data:", data);

  const changeName = () => {
    if (buttonName === "Login") {
      setButtonName("Logout");
    } else {
      setButtonName("Login");
    }
  };

  // Subscribing to the store using a Selector

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between bg-pink-100 shadow-lg">
      <div className="logo-container">
        <img alt="logo" className="w-56" src={logo}></img>
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li className="px-4">
            <Link to="/">Home</Link>{" "}
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4 font-bold text-xl">Cart - ({cartItems.length} items)</li>
          <button
            className="login"
            onClick={() => {
              changeName();
            }}
          >
            {buttonName}
          </button>
          <li className="px-4 text-xl font-extrabold">{data.loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
