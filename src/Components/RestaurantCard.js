import { useContext } from "react";
import constants from "../utils/constants";
import ThemeContext from "../utils/ThemeContext";

const RestaurantCard = (props) => {
    const { resData } = props;
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";
    const { cloudinaryImageId,
        name,
        avgRating,
        cuisines,
        areaName,
        costForTwo
    } = resData?.info;

    return (
        <div
            data-testid="resCard"
            className={`h-full w-full rounded-xl p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${isDark ? "bg-slate-800" : "bg-white"}`}>
                <img className="h-44 w-full rounded-lg object-cover"
                    alt="res-logo"
                    src={
                        constants.CDN_URL + cloudinaryImageId} />
                <div className="res-content">
                    <h3 className={`py-3 text-lg font-bold ${isDark ? "text-slate-100" : "text-gray-800"}`}>{name}</h3>
                    <h4 className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`}>Rating: {avgRating}</h4>

                    {/* Array's function to arrange the number with , */}
                    <h4 className={`line-clamp-2 text-sm ${isDark ? "text-slate-300" : "text-gray-600"}`}>{cuisines.join(", ")}</h4>
                    <p className={`mt-1 text-sm ${isDark ? "text-slate-300" : "text-gray-600"}`}>{areaName}</p>
                    <p className={`mt-1 text-sm font-semibold ${isDark ? "text-amber-300" : "text-gray-700"}`}>{costForTwo}</p>
                </div>
        </div>
    );
};

export const withOpenLabel = (RestaurantCard) => {
    return (props) => {
        const { theme } = useContext(ThemeContext);
        const isDark = theme === "dark";

        return (
            <div className="relative h-full">
                <label className={`absolute left-3 top-3 z-10 rounded-md px-2 py-1 text-xs ${isDark ? "bg-emerald-700 text-white" : "bg-black text-white"}`}>
                    Open
                </label>
                <RestaurantCard {...props} />
            </div>
        );
    }
}
export default RestaurantCard;