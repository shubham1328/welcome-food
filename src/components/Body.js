import React, { useContext, useEffect, useState } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

function Body(props) {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filterRestaurants, setFilterfilterRestaurants] = useState([]);
  const [searchText, setsearchText] = useState("");
  const { setUserName, loggedInUser } = useContext(UserContext);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    //"https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"

    const json = await data.json();

    //optional chaining
    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilterfilterRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  // Define topResturo function
  const topResturo = () => {
    const filteredRestaurants = listOfRestaurants.filter(
      (respD) => {
        return respD.info.avgRatingString > 4
      }
    );
    setListOfRestaurants(filteredRestaurants);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    console.log("Ofline");
    return <h1>Your are ofline Check your Internet </h1>;
  }

  const filterRestro = (searchText) => {
    const searchRe = listOfRestaurants.filter((respD) =>
      respD.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log("Search", searchRe);
    setFilterfilterRestaurants(searchRe);
  };

  return (
    <div className="body">
      <div className="filter flex">
        <div className="m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-2xl"
            onClick={() => {
              filterRestro(searchText);
            }}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100"
            onClick={() => topResturo()}
          >
            Top Rated Restaurant
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
         <label>UserName:</label>
         <input className="border px-2 m-2 border-solid border-black"
         value={loggedInUser}
         onChange={(e) => setUserName(e.target.value)}
         />
        </div>
      </div>
      {listOfRestaurants.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="flex flex-wrap">
          {filterRestaurants.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurant/" + restaurant.info.id}
            >
              {
                /*if the restaurant is promoted then add a promoted label to it */
                restaurant.info.promoted ? (
                  <RestaurantCardPromoted respList={restaurant} />
                ) : (
                  <RestaurantCard respList={restaurant} />
                )
              }
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Body;
