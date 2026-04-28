import { createContext } from "react";

const UserContext = createContext({
    loggedInUser : "Rohit",
    setUserName: () => {},
});

export default UserContext;