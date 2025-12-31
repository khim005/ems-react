import { useState, type ReactNode } from "react"
import Cookies from "js-cookie"
import axiosInstance from "../../config/Axios";
import { setCookie } from "../../utilities/helpers";
import type { ICredentials } from "../../types/AuthTypes";
import AuthContext from "../AuthContext";

const AuthProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
    const [loggedInUser, setLoggedInUser] = useState();

    const login = async (credentials: ICredentials) => {
        const response = await axiosInstance.post("/auth/login", credentials)
        setCookie("_at", response.data, 1)
    }

    const getLoggedInUserProfile = async () => {
        const loggedInUser = await axiosInstance.get("/auth/me", {
            headers: {
                Authorization: "Bearer " + Cookies.get("_at"),
            },
        });
        setLoggedInUser(loggedInUser.data);
        return loggedInUser.data
    }
    return (
        <>
            <AuthContext.Provider
                value={{
                    loggedInUser: loggedInUser,
                    getLoggedInUserProfile: getLoggedInUserProfile,
                    login: login,

                    // register: () => {},
                    // activation: () => {},
                    // forgetPassword: () => {},
                    // logout: () => {},
                    // resetPassword: () => {},
                }}
            >
                {children}
            </AuthContext.Provider>
        </>
    );
}

export default AuthProvider