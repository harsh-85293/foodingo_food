import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../utils/UserContext";
import ThemeContext from "../utils/ThemeContext";

const PROFILE = {
    name: "Harsh Ramchandani",
    github: "https://github.com/harsh-85293",
    linkedin: "https://www.linkedin.com/in/harsh-ramchandani007/",
};

const AuthPage = () => {
    const navigate = useNavigate();
    const { setUserName } = useContext(UserContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isLoginView, setIsLoginView] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: PROFILE.name,
        email: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const fullName = formData.fullName.trim();
        const email = formData.email.trim();
        const password = formData.password.trim();

        if (!fullName || !email || !password) {
            alert("Please fill all required fields.");
            return;
        }

        setUserName(fullName);
        navigate("/");
    };
    const isDark = theme === "dark";

    return (
        <div className={`min-h-screen px-4 py-10 ${isDark ? "bg-gradient-to-br from-slate-950 via-violet-900 to-fuchsia-700" : "bg-gradient-to-br from-red-100 via-amber-50 to-orange-100"}`}>
            <div className="mx-auto mb-4 flex w-full max-w-6xl justify-end">
                <button
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${isDark ? "bg-white/15 text-white hover:bg-white/25" : "bg-white text-slate-700 shadow-sm hover:bg-slate-100"}`}
                    onClick={toggleTheme}
                    type="button"
                >
                    {isDark ? "Light Theme" : "Dark Theme"}
                </button>
            </div>
            <div className={`mx-auto flex min-h-[84vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-sm md:flex-row ${isDark ? "border-white/20 bg-white/10" : "border-red-100 bg-white"}`}>
                <div className={`flex flex-1 flex-col justify-between border-b p-8 md:border-b-0 md:border-r md:p-12 ${isDark ? "border-white/20 bg-gradient-to-br from-violet-800/80 to-fuchsia-700/80 text-white" : "border-red-100 bg-gradient-to-br from-red-500 to-orange-500 text-white"}`}>
                    <div>
                    <p className="mb-4 inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                        Foodingo
                    </p>
                    <h1 className="text-3xl font-bold leading-tight md:text-4xl">
                        {isLoginView ? "Welcome Back, Harsh" : "Create Your Foodingo Account"}
                    </h1>
                    <p className="mt-4 text-sm text-red-50 md:text-base">
                        {isLoginView
                            ? "Login to continue exploring restaurants and managing your orders with a cleaner premium dashboard."
                            : "Sign up to save preferences, manage your cart faster, and enjoy a personalized experience."}
                    </p>

                    <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4">
                        <p className="text-xs uppercase tracking-wide text-violet-100">Developer Profile</p>
                        <p className="mt-2 text-lg font-semibold">{PROFILE.name}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <a
                                className="rounded-lg bg-black/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-black/40"
                                href={PROFILE.github}
                                rel="noreferrer"
                                target="_blank"
                            >
                                GitHub Profile
                            </a>
                            <a
                                className="rounded-lg bg-white/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/30"
                                href={PROFILE.linkedin}
                                rel="noreferrer"
                                target="_blank"
                            >
                                LinkedIn Profile
                            </a>
                        </div>
                    </div>
                    </div>

                    <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                        <p className="text-sm font-semibold">Stay Connected</p>
                        <div className="mt-3 flex gap-2">
                            <input
                                className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-violet-100/70 outline-none"
                                placeholder="Your email address"
                                type="email"
                            />
                            <button
                                className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-violet-700 transition hover:bg-violet-100"
                                type="button"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`flex flex-1 items-center justify-center p-6 md:p-10 ${isDark ? "bg-slate-50" : "bg-white"}`}>
                    <div className="w-full max-w-md">
                        <div className={`rounded-xl p-1 ${isDark ? "bg-slate-200" : "bg-gray-100"}`}>
                            <div className="grid grid-cols-2 gap-1">
                                <button
                                    type="button"
                                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${isLoginView ? "bg-white text-red-600 shadow" : "text-gray-600 hover:bg-white/70"}`}
                                    onClick={() => setIsLoginView(true)}
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${!isLoginView ? "bg-white text-red-600 shadow" : "text-gray-600 hover:bg-white/70"}`}
                                    onClick={() => setIsLoginView(false)}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-gray-800">
                            {isLoginView ? "Login to your account" : "Create your account"}
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Enter your details below to continue.
                        </p>

                        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="fullName">
                                    Full name
                                </label>
                                <input
                                    id="fullName"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                                    name="fullName"
                                    type="text"
                                    placeholder="Enter your full name (Harsh Ramchandani)"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="password">
                                    Password
                                </label>
                                <div className="flex items-center rounded-xl border border-gray-300 px-4 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100">
                                    <input
                                        id="password"
                                        className="w-full py-3 text-gray-800 outline-none"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        type="button"
                                        className="text-xs font-semibold text-gray-500 hover:text-red-500"
                                        onClick={() => setShowPassword((prevValue) => !prevValue)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <button
                                className="w-full rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
                                type="submit"
                            >
                                {isLoginView ? "Login" : "Create Account"}
                            </button>
                        </form>

                        <p className="mt-5 text-center text-xs text-gray-500">
                            {isLoginView ? "Do not have an account?" : "Already have an account?"}{" "}
                            <button
                                className="font-semibold text-red-500 hover:underline"
                                onClick={() => setIsLoginView((prevValue) => !prevValue)}
                                type="button"
                            >
                                {isLoginView ? "Sign Up" : "Login"}
                            </button>
                        </p>

                        <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-600">
                            Connected profile links:
                            {" "}
                            <a className="font-semibold text-violet-700 hover:underline" href={PROFILE.github} rel="noreferrer" target="_blank">GitHub</a>
                            {" | "}
                            <a className="font-semibold text-violet-700 hover:underline" href={PROFILE.linkedin} rel="noreferrer" target="_blank">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
