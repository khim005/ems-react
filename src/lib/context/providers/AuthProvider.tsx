import { useEffect, useState, type ReactNode } from "react"
import Cookies from "js-cookie"
import axiosInstance from "../../config/Axios"
import type { ICredentials, IUser } from "../../types/AuthTypes"
import AuthContext from "../AuthContext"
import { setCookie } from "../../utilities/helpers"


const AuthProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null);
  const [loading , setLoading] = useState(true);

  const login = async (credentials: ICredentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    const accessToken = response.accessToken;
    console.log("Stored token:", Cookies.get("_at"));
    if (!accessToken) {
      throw new Error("Login failed: No access token received");
    }
    setCookie("_at", accessToken, 1);
    setLoggedInUser(response.user);
    return response;
  };
// 👤 PROFILE (used on refresh)
  const getLoggedInUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/auth/profile");
      setLoggedInUser(response.user);
    } catch {
      setLoggedInUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 AUTO LOAD USER ON APP START
  useEffect(() => {
    const token = Cookies.get("_at");
    if (token) {
      getLoggedInUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    Cookies.remove("_at");
    setLoggedInUser(null);
  };


  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        loading,
        login,
        logout,
        getLoggedInUserProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;