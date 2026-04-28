import RestaurantCard, { withOpenLabel } from "./RestaurantCard";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import TopChain from './TopChain'
import { Link } from "react-router-dom";
import constants from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import mockRestaurants from "../utils/mockdata";

const Body = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const RestaurantCardOpen = withOpenLabel(RestaurantCard);
    const { loggedInUser } = useContext(UserContext);

    useEffect(() => {
        fetchData();
    }, []);

    const extractRestaurants = (json) => {
        const cards = json?.data?.cards || [];
        const restaurantCard = cards.find(
            (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        return restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    };

    const fetchData = async () => {
        try {
            const data = await fetch(constants.BODY_URL);
            const json = await data.json();
            const restaurants = extractRestaurants(json);
            setListOfRestaurants(restaurants || []);
            setFilteredRestaurants(restaurants || []);
        } catch (err) {
            console.log("Error Fetching Foodingo data:", err);
            setListOfRestaurants(mockRestaurants);
            setFilteredRestaurants(mockRestaurants);
        }
    };

    const onlineStatus = useOnlineStatus();
    if (onlineStatus === false) return (<h1 className="font-bold text-center text-2xl p-4 m-4">Check Your Internet Connection!!!</h1>);

    return (listOfRestaurants.length === 0) ?
        (<Shimmer />) :
        (
            <div className="body bg-gray-50 pb-20">
                <div className="mx-auto max-w-7xl px-4 pt-8">
                    <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm md:p-5">
                        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                            <div>
                                <h2 className="text-2xl font-extrabold text-gray-800">Discover Great Food</h2>
                                <p className="text-sm text-gray-500">Welcome, {loggedInUser}. Find your next meal in seconds.</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                    {/* Search Bar */}
                    <div className="search flex items-center gap-2">
                        <input
                            className="w-56 rounded-xl border border-gray-300 p-2 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                            type="text"
                            placeholder="Search restaurants"
                            value={searchText}
                            data-testid="searchInput"
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                        <button className="px-4 py-2 bg-green-200 flex items-center rounded-lg cursor-pointer hover:bg-green-400"
                            onClick={() => {
                                const filteredRestaurant = listOfRestaurants.filter(
                                    (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                                );
                                setFilteredRestaurants(filteredRestaurant);
                            }}
                        >
                            Search
                        </button>
                    </div>

                    {/* Button to filter the restaturants */}
                    <div>
                        <button
                            className="px-4 py-2 bg-gray-200 flex items-center rounded-lg cursor-pointer hover:bg-gray-400"
                            onClick={() => {
                                const filteredList = listOfRestaurants.filter(
                                    (res) => res.info.avgRating > 4
                                );
                                setFilteredRestaurants(filteredList);
                            }}>
                            Top Rated Restaurants
                        </button>
                    </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-4 max-w-7xl px-4">
                    <TopChain restaurants={listOfRestaurants} />
                </div>

                <div className="mx-auto mt-6 max-w-7xl px-4 pb-40">
                    <p className="mb-4 text-sm font-medium text-gray-600">
                        Showing {filteredRestaurants.length} restaurants
                    </p>
                    <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {
                        filteredRestaurants.map((restaurant) => (
                            <Link
                                to={"/restaurants/" + restaurant.info.id}
                                className="w-full"
                                key={restaurant.info.id}>
                                {/* Add open label */
                                    restaurant.info.isOpen ?
                                        <RestaurantCardOpen resData={restaurant} /> :
                                        <RestaurantCard resData={restaurant} />
                                }
                            </Link>
                        ))
                    }
                    </div>
                </div>
            </div>
        );
};

export default Body;