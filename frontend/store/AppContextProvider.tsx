import React, { useState, createContext, useEffect } from "react";

import { SERVER_ADDRESS } from "../App";

import { IAuthCookies, ICourseData, ICourseListResponse } from "../common/CommonDataTypes";

interface IAppContext {
  authCookies: IAuthCookies | null;
  logIn: (authCookies: IAuthCookies) => void;
  courseData: ICourseData[] | null;
}

export const AppContext = createContext<IAppContext>({
  authCookies: null,
  logIn: () => {
    return;
  },
  courseData: null,
});

interface Props {
  children?: React.ReactNode;
}

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [authCookies, setAuthCookies] = useState<IAuthCookies | null>(null);
  const [courseData, setCourseData] = useState<ICourseData[] | null>(null);

  const logIn = (authCookies: IAuthCookies) => {
    setAuthCookies(authCookies);
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const body = JSON.stringify({
        JSOSSESSID: authCookies.JSOSSESSID,
      });

      const loginResult = await fetch(SERVER_ADDRESS + "/courseList", {
        method: "POST",
        headers,
        body,
      });

      const { courseList } = (await loginResult.json()) as ICourseListResponse;

      setCourseData(courseList);
    };

    if (authCookies) {
      fetchCourseData();
    }
  }, [authCookies, setCourseData]);

  return (
    <AppContext.Provider value={{ authCookies, logIn, courseData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
