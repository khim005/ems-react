export interface ICredentials {
  email: string;
  password: string;
}

export interface IRegsiterData {
  fullName: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
}


export interface IAuthContext {
  loggedInUser: IUser | null;
  loading: boolean;
  getLoggedInUserProfile: () => Promise<IUser>;
  login: (credentials: ICredentials) => Promise<void>;
  logout: () => void;
  refreshToken?: () => Promise<void>;
}


