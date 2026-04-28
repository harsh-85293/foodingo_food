import RestaurantCard, { withOpenLabel } from "./RestaurantCard";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import TopChain from './TopChain'
import { Link } from "react-router-dom";
import constants from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import ThemeContext from "../utils/ThemeContext";
import mockRestaurants from "../utils/mockdata";

const Body = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const RestaurantCardOpen = withOpenLabel(RestaurantCard);
    const { loggedInUser } = useContext(UserContext);
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

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
            <div className={`body pb-20 ${isDark ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-900"}`}>
                <div className="mx-auto max-w-7xl px-4 pt-8">
                    <div className={`mb-4 rounded-2xl p-4 shadow-sm md:p-5 ${isDark ? "bg-slate-800" : "bg-white"}`}>
                        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                            <div>
                                <h2 className={`text-2xl font-extrabold ${isDark ? "text-slate-100" : "text-gray-800"}`}>Discover Great Food</h2>
                                <p className={`text-sm ${isDark ? "text-slate-300" : "text-gray-500"}`}>Welcome, {loggedInUser}. Find your next meal in seconds.</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                    {/* Search Bar */}
                    <div className="search flex items-center gap-2">
                        <input
                            className={`w-56 rounded-xl p-2 outline-none focus:ring-2 ${isDark ? "border border-slate-600 bg-slate-900 text-slate-100 placeholder:text-slate-400 focus:border-amber-300 focus:ring-amber-200/20" : "border border-gray-300 bg-white text-slate-900 focus:border-red-400 focus:ring-red-100"}`}
                            type="text"
                            placeholder="Search restaurants"
                            value={searchText}
                            data-testid="searchInput"
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                        <button className={`px-4 py-2 flex items-center rounded-lg cursor-pointer transition ${isDark ? "bg-emerald-800 text-emerald-100 hover:bg-emerald-700" : "bg-green-200 hover:bg-green-400"}`}
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
                            className={`px-4 py-2 flex items-center rounded-lg cursor-pointer transition ${isDark ? "bg-slate-700 text-slate-100 hover:bg-slate-600" : "bg-gray-200 hover:bg-gray-400"}`}
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
                    <p className={`mb-4 text-sm font-medium ${isDark ? "text-slate-300" : "text-gray-600"}`}>
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