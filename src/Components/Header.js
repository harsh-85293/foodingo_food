import { useContext } from 'react';
import constants from '../utils/constants'
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import ThemeContext from '../utils/ThemeContext';
import { useSelector } from 'react-redux';

export const Header = () => {

    const onlineStatus = useOnlineStatus(true);
    const { loggedInUser, setUserName } = useContext(UserContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const cartItems = useSelector((store) => store.cart.items);

    const isDark = theme === "dark";

    return (
        <header className={`sticky top-0 z-20 border-b shadow-sm ${isDark ? "border-slate-700 bg-slate-950 text-slate-100" : "border-red-100 bg-red-50 text-slate-800"}`}>
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="logo-container flex items-center gap-3">
                <img className="h-14 w-14 rounded-full bg-white p-1 shadow-sm" src={constants.LOGO_URL} alt="Foodingo logo" />
                <div>
                    <h1 className="text-lg font-extrabold">Foodingo</h1>
                    <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Quick delivery, great food</p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm">
                <ul className="flex flex-wrap items-center gap-2">
                    <li className={`px-3 py-2 text-xs font-semibold md:text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        Online Status : {onlineStatus ? "🟢" : "🔴"}
                    </li>
                    <li className={`rounded-lg px-3 py-2 transition hover:font-semibold ${isDark ? "hover:bg-slate-800" : "hover:bg-red-100"}`}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={`rounded-lg px-3 py-2 transition hover:font-semibold ${isDark ? "hover:bg-slate-800" : "hover:bg-red-100"}`}>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li className={`rounded-lg px-3 py-2 transition hover:font-semibold ${isDark ? "hover:bg-slate-800" : "hover:bg-red-100"}`}>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li className={`rounded-lg px-3 py-2 transition hover:font-semibold ${isDark ? "hover:bg-slate-800" : "hover:bg-red-100"}`}>
                        <Link to="/cart">
                            Cart ({cartItems.length} items)
                        </Link>
                    </li>
                    <li className={`rounded-lg px-3 py-2 transition hover:font-semibold ${isDark ? "hover:bg-slate-800" : "hover:bg-red-100"}`}>
                        <Link to="/grocery">Grocery</Link>
                    </li>
                    <button
                        className={`rounded-lg px-3 py-2 font-semibold transition ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-white hover:bg-red-100"}`}
                        onClick={toggleTheme}
                        type="button"
                    >
                        {isDark ? "Light Theme" : "Dark Theme"}
                    </button>
                    <button
                        className={`rounded-lg px-3 py-2 font-semibold transition ${isDark ? "bg-red-800 text-white hover:bg-red-700" : "bg-red-100 text-red-700 hover:bg-red-200"}`}
                        onClick={() => setUserName("")}
                        type="button"
                    >
                        Logout
                    </button>
                    <li className={`rounded-lg px-3 py-2 font-semibold ${isDark ? "bg-slate-800 text-amber-300" : "bg-red-200 text-red-700"}`}>
                        Welcome, {loggedInUser}!
                    </li>
                </ul>
            </div>
            </div>
        </header>
    );
}
