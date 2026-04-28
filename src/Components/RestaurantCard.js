import constants from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props;
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
            className="h-full w-full rounded-xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <img className="h-44 w-full rounded-lg object-cover"
                    alt="res-logo"
                    src={
                        constants.CDN_URL + cloudinaryImageId} />
                <div className="res-content">
                    <h3 className="py-3 text-lg font-bold text-gray-800">{name}</h3>
                    <h4 className="text-sm font-medium text-gray-700">Rating: {avgRating}</h4>

                    {/* Array's function to arrange the number with , */}
                    <h4 className="line-clamp-2 text-sm text-gray-600">{cuisines.join(", ")}</h4>
                    <p className="mt-1 text-sm text-gray-600">{areaName}</p>
                    <p className="mt-1 text-sm font-semibold text-gray-700">{costForTwo}</p>
                </div>
        </div>
    );
};

export const withOpenLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div className="relative h-full">
                <label className="absolute left-3 top-3 z-10 rounded-md bg-black px-2 py-1 text-xs text-white">
                    Open
                </label>
                <RestaurantCard {...props} />
            </div>
        );
    }
}
export default RestaurantCard;