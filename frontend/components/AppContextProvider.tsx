import React, { useState, createContext } from "react";

export interface AuthCookies {
  YII_CSRF_TOKEN: string;
  JSOSSESSID: string;
}

interface AppContextI {
  authCookies: AuthCookies | null;
  loggedIn: boolean;
  logIn: (authCookies: AuthCookies) => void;
}

interface Props {
  children?: React.ReactNode;
}

export const AppContext = createContext<AppContextI>({
  authCookies: null,
  loggedIn: false,
  logIn: () => {
    return;
  },
});

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [authCookies, setAuthCookies] = useState<AuthCookies | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const logIn = (authCookies: AuthCookies) => {
    setAuthCookies(authCookies);
    setLoggedIn(true);
  };

  return (
    <AppContext.Provider value={{ authCookies, loggedIn, logIn }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
