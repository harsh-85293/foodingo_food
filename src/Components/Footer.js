import { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";

const Footer = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    return (
        <div className={`mt-auto w-full border-t py-6 text-center text-xl font-bold shadow-inner ${isDark ? "border-slate-700 bg-slate-950 text-slate-200" : "border-red-100 bg-red-50 text-slate-700"}`}>
            <h2>Welcome to Foodigo App!!!</h2>
        </div>
    )
}

export default Footer;