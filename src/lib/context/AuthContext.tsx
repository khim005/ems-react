import { createContext } from "react";
import type { ICredentials, IUser } from "../types/AuthTypes";


export interface AuthContextType {
  loggedInUser: IUser | null;
  loading: boolean;
  login: (credentials: ICredentials) => Promise<any>;
  logout: () => void;
  getLoggedInUserProfile: () => Promise<IUser>;
}

const defaultContext: AuthContextType = {
  loggedInUser: null,
  loading: false,
  login: async () => { throw new Error("AuthContext: login not implemented"); },
  logout: () => {},
  getLoggedInUserProfile: async () => { throw new Error("AuthContext: getLoggedInUserProfile not implemented"); },
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export default AuthContext;