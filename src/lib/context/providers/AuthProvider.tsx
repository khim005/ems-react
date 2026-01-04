import { useState, type ReactNode, useEffect } from "react"
import Cookies from "js-cookie"
import axiosInstance from "../../config/Axios"
import type { ICredentials, IUser } from "../../types/AuthTypes"
import AuthContext from "../AuthContext"

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
  msg?: string;
}

interface ProfileResponse {
  user: IUser;
  msg?: string;
}

const AuthProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = Cookies.get("_at");
    if (token) {
      getLoggedInUserProfile().catch((error) => {
        console.log("Auto-login failed:", error.message);
        setLoading(false);
        Cookies.remove("_at");
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials: ICredentials): Promise<LoginResponse> => {
    try {
      console.log("Sending login request for:", credentials.email);

      // Send login request - use try/catch in axios call
      const response = await axiosInstance.post<LoginResponse>("/auth/login", credentials);
      console.log("Login response:", response);

      // Check if response exists
      if (!response) {
        throw new Error("No response received from server");
      }
      // Extract token from response
      const responseData = response.data || response;
      // const token = response.accessToken || response.accessToken;
      const token = responseData.accessToken ;

      console.log("Token extracted:", token ? "Yes" : "No", response);

      if (!token) {
        console.error("No token found in response. Full response:", response);
        throw new Error("No authentication token received from server");
      }

      // Store token in cookie
      Cookies.set("_at", token, {
        expires: 1, // 1 day
        secure: import.meta.env.PROD,
        sameSite: 'strict'
      });

      console.log("Token stored in cookie");

      // Store user data if returned
      // const userData = response.user || response.user;
      // if (userData) {
      //   setLoggedInUser(userData);
      //   console.log("User data set:", userData);
      // }

      return response.data;

    } catch (error: any) {
      console.error("Login error in AuthProvider:", {
        error: error,
        message: error?.message,
        response: error?.response
      });

      // Handle specific error cases
      let errorMessage = "Login failed";

      if (error?.response?.msg) {
        errorMessage = error.response.msg;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.code === 400) {
        errorMessage = "Invalid email or password";
      } else if (error?.code === 404) {
        errorMessage = "Login endpoint not found";
      } else if (error?.code === 500) {
        errorMessage = "Server error";
      }

      throw new Error(errorMessage);
    }
  }

  const getLoggedInUserProfile = async (): Promise<IUser> => {
    try {
      const token = Cookies.get("_at");
      console.log("🔄 Fetching profile. Token from cookies:", token ? "Exists" : "Missing");

      if (!token) {
        throw new Error("No authentication token found");
      }

      console.log("Fetching user profile with token...");

      // Call profile endpoint
      const response = await axiosInstance.get<ProfileResponse>("/auth/profile");
      console.log("✅ Profile response:", response);

      if (!response) {
        throw new Error("No response from profile endpoint");
      }

      const userData = response.data.user || response.data?.user || response;

      if (!userData || (!userData.id && !userData.email)) {
        throw new Error("Invalid user data received from server");
      }

      setLoggedInUser(userData);
      console.log("👤 User profile loaded:", userData.email);

      return userData;

    } catch (error: any) {
      console.error("Error fetching user profile:", error);

      // Clear token on 401
      if (error.code === 401) {
        Cookies.remove("_at");
        setLoggedInUser(null);
      }

      throw error;
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    Cookies.remove("_at");
    setLoggedInUser(null);
    window.location.href = "/login";
  }


  return (
    <AuthContext.Provider
      value={{
        loggedInUser: loggedInUser,
        loading,
        login,
        logout,
        getLoggedInUserProfile
      }}>
        {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;