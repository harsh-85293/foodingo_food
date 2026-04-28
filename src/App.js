import { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Header } from './Components/Header';
import Body from './Components/Body';
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import Error from "./Components/Error";
import Cart from "./Components/Cart";
import RestaurantMenu from "./Components/RestaurantMenu";
import { Navigate, Outlet, RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import About from "./Components/About";
import UserContext from "./utils/UserContext";
import ThemeContext from "./utils/ThemeContext";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";
import AuthPage from "./Components/AuthPage";

const Grocery = lazy(() => import("./Components/Grocery"));
const AUTH_STORAGE_KEY = "foodingo-auth-user";
const THEME_STORAGE_KEY = "foodingo-theme";

const AppLayout = () => {
    const location = useLocation();
    const [userName, setUserName] = useState(() => localStorage.getItem(AUTH_STORAGE_KEY) || "");
    const [theme, setTheme] = useState(() => localStorage.getItem(THEME_STORAGE_KEY) || "light");
    const isAuthenticated = Boolean(userName);

    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const handleSetUserName = (name) => {
        const trimmedName = (name || "").trim();
        setUserName(trimmedName);
        if (trimmedName) {
            localStorage.setItem(AUTH_STORAGE_KEY, trimmedName);
            return;
        }
        localStorage.removeItem(AUTH_STORAGE_KEY);
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    if (!isAuthenticated && location.pathname !== "/auth") {
        return <Navigate to="/auth" replace />;
    }

    if (isAuthenticated && location.pathname === "/auth") {
        return <Navigate to="/" replace />;
    }

    return (
        <Provider store={appStore}>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <UserContext.Provider value={{ loggedInUser: userName, setUserName: handleSetUserName }}>
                    {location.pathname === "/auth" ? (
                        <AuthPage />
                    ) : (
                        <div className={`min-h-screen flex flex-col transition-colors ${theme === "dark" ? "bg-slate-900" : "bg-slate-100"}`}>
                            <Header />
                            <main className="flex-grow">
                                <Outlet />
                            </main>
                            <Footer />
                        </div>
                    )}
                </UserContext.Provider>
            </ThemeContext.Provider>
        </Provider>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element:
                    <About />
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />,
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<h2 className="text-center text-xl p-4">The Grocery Page is Loading!!!</h2>}>
                    <Grocery />
                </Suspense>,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/auth",
                element: <div />,
            }
        ],
        errorElement: <Error />,
    },
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

