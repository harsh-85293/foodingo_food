import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../utils/UserContext";

const AuthPage = () => {
    const navigate = useNavigate();
    const { setUserName } = useContext(UserContext);
    const [isLoginView, setIsLoginView] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-100 via-amber-50 to-orange-100 px-4 py-10">
            <div className="mx-auto flex min-h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">
                <div className="flex flex-1 flex-col justify-center bg-red-500 p-8 text-white md:p-12">
                    <p className="mb-4 inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                        Foodingo
                    </p>
                    <h1 className="text-3xl font-bold leading-tight md:text-4xl">
                        {isLoginView ? "Welcome Back!" : "Join Foodingo Today"}
                    </h1>
                    <p className="mt-4 text-sm text-red-50 md:text-base">
                        {isLoginView
                            ? "Login to continue exploring top-rated restaurants and quick delivery options."
                            : "Create your account and start ordering from your favorite restaurants in minutes."}
                    </p>
                </div>

                <div className="flex flex-1 items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-md">
                        <div className="rounded-xl bg-gray-100 p-1">
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
                                    placeholder="Enter your full name"
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
