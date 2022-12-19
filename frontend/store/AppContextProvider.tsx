import React, { useState, createContext, useEffect } from "react";

import { SERVER_ADDRESS } from "../App";

import {
  ILoginResponse,
  ICourseData,
  ICourseListResponse,
  IExerciseData,
  IExercisesReponse,
  IUsersResponse,
  IUserData,
} from "../app_modules/common/CommonDataTypes";

interface IAppContext {
  jsossessid: string | null;
  logIn: (loginResponse: ILoginResponse) => void;
  courseData: ICourseData[] | null;
  exercises: IExerciseData[] | null;
  votableUsers: IUserData[] | null;
  isStarosta: boolean;
  refreshStudentData: () => void;
}

export const AppContext = createContext<IAppContext>({
  jsossessid: null,
  logIn: () => {
    return;
  },
  courseData: null,
  exercises: null,
  votableUsers: null,
  isStarosta: false,
  refreshStudentData: () => {
    return;
  },
});

interface Props {
  children?: React.ReactNode;
}

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [jsossessid, setJsossessid] = useState<string | null>(null);
  const [isStarosta, setIsStarosta] = useState<boolean>(false);
  const [courseData, setCourseData] = useState<ICourseData[] | null>(null);
  const [exercises, setExercises] = useState<IExerciseData[] | null>(null);
  const [votableUsers, setVotableUsers] = useState<IUserData[] | null>(null);

  const logIn = (loginResponse: ILoginResponse) => {
    setJsossessid(loginResponse.jsossessid);
    setIsStarosta(loginResponse.isStarosta);
  };

  const fetchCourseData = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const coursesResult = await fetch(
      SERVER_ADDRESS + "/api/session/" + jsossessid + "/courses",
      {
        headers,
      }
    );

    const courseList = (await coursesResult.json()) as ICourseListResponse;

    console.log(courseList);

    setCourseData(courseList);
  };

  const fetchExercises = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const exercisesResult = await fetch(
      SERVER_ADDRESS + "/api/session/" + jsossessid + "/tasks/all",
      {
        headers,
      }
    );

    const exerciseList = (await exercisesResult.json()) as IExercisesReponse;

    console.log(exerciseList);

    setExercises(exerciseList);
  };

  const fetchVotableUsers = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const votableUsersResult = await fetch(
      SERVER_ADDRESS + "/api/session/" + jsossessid + "/students",
      {
        headers,
      }
    );

    const votableUsers = (await votableUsersResult.json()) as IUsersResponse;

    console.log(votableUsers);

    setVotableUsers(votableUsers);
  };

  const refreshStudentData = async () => {
    fetchCourseData();
    fetchExercises();
    fetchVotableUsers();
  };

  useEffect(() => {
    if (jsossessid) {
      refreshStudentData();
    }
  }, [jsossessid, setCourseData, setVotableUsers]);

  return (
    <AppContext.Provider
      value={{
        jsossessid,
        logIn,
        courseData,
        exercises,
        votableUsers,
        isStarosta,
        refreshStudentData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
