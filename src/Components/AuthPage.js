import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../utils/UserContext";

const AuthPage = () => {
    const navigate = useNavigate();
    const { setUserName } = useContext(UserContext);
    const [isLoginView, setIsLoginView] = useState(true);
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
        <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800">
                    {isLoginView ? "Login to Foodingo" : "Create Foodingo Account"}
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    {isLoginView ? "Welcome back! Enter your details and name." : "Sign up with your name to continue browsing restaurants."}
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <input
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-400 focus:outline-none"
                        name="fullName"
                        type="text"
                        placeholder="Full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                    />
                    <input
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-400 focus:outline-none"
                        name="email"
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-400 focus:outline-none"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />

                    <button
                        className="w-full rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
                        type="submit"
                    >
                        {isLoginView ? "Login" : "Sign Up"}
                    </button>
                </form>

                <button
                    className="mt-5 w-full text-sm text-red-500 hover:underline"
                    onClick={() => setIsLoginView((prevValue) => !prevValue)}
                    type="button"
                >
                    {isLoginView ? "New here? Create an account" : "Already have an account? Login"}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;
