import { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";

const TopChain = ({ restaurants = [] }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";
    const topChains = restaurants
        .map((restaurant) => restaurant?.info?.name)
        .filter(Boolean)
        .slice(0, 10);

    if (topChains.length === 0) {
        return (
            <div className={`rounded-2xl border border-dashed p-5 text-sm ${isDark ? "border-slate-600 bg-slate-800 text-slate-300" : "border-gray-300 bg-white text-gray-500"}`}>
                Top chain data is currently unavailable.
            </div>
        );
    }

    return (
        <section className={`rounded-2xl p-5 shadow-sm ${isDark ? "bg-slate-800" : "bg-white"}`}>
            <h2 className={`text-2xl font-extrabold ${isDark ? "text-slate-100" : "text-gray-800"}`}>Top Chain Restaurants</h2>
            <p className={`mt-1 text-sm ${isDark ? "text-slate-300" : "text-gray-500"}`}>Popular picks you can explore quickly</p>

            <div className="mt-4 flex flex-wrap gap-3">
                {topChains.map((chainName) => (
                    <span
                        className={`rounded-full border px-4 py-2 text-sm font-semibold ${isDark ? "border-amber-600 bg-amber-900/30 text-amber-300" : "border-red-200 bg-red-50 text-red-700"}`}
                        key={chainName}
                    >
                        {chainName}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default TopChain;
