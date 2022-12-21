import React, { useState, createContext, useEffect } from "react";

import { SERVER_ADDRESS } from "../App";

import {
  ILoginResponse,
  IGetTasksResponse,
  ICourseListResponse,
  IStudentsResponse,
  IGetUserTasksResponse,
} from "../common/HttpDataTypes";

import { IStudent } from "../common/DataTypes";

interface FetchedContent<T> {
  isLoading: boolean;
  error: string | null;
  content: T | null;
}

const loadingFetchedContent = { isLoading: true, error: null, content: null };

const loadedFetchedContent = <T,>(content: T) => {
  return {
    isLoading: false,
    error: null,
    content: { ...content },
  };
};

const errorFetchedContent = (error: string) => {
  return { isLoading: false, error, content: null };
};

const initialFetchedContent = {
  isLoading: false,
  error: null,
  content: null,
};

interface IAppContext {
  startLogin: () => void;
  logIn: (loginResponse: ILoginResponse) => void;
  errorLogin: (error: string) => void;

  reloadCourses: () => void;
  reloadTasks: () => void;
  reloadStudents: () => void;
  reloadUserTasks: () => void;
  reloadAll: () => void;

  loginData: FetchedContent<ILoginResponse>;
  tasks: FetchedContent<IGetTasksResponse>;
  courses: FetchedContent<ICourseListResponse>;
  students: FetchedContent<IStudentsResponse>;
  userTasks: FetchedContent<IGetUserTasksResponse>;

  pickedOldman: IStudent | null;
  chosenOldman: IStudent | null;
}

const emptyFunction = () => {
  return;
};

export const AppContext = createContext<IAppContext>({
  startLogin: emptyFunction,
  logIn: emptyFunction,
  errorLogin: emptyFunction,

  reloadCourses: emptyFunction,
  reloadTasks: emptyFunction,
  reloadStudents: emptyFunction,
  reloadUserTasks: emptyFunction,
  reloadAll: emptyFunction,

  loginData: initialFetchedContent,
  tasks: initialFetchedContent,
  courses: initialFetchedContent,
  students: initialFetchedContent,
  userTasks: initialFetchedContent,

  pickedOldman: null,
  chosenOldman: null,
});

interface Props {
  children?: React.ReactNode;
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [loginData, setLoginData] = useState<FetchedContent<ILoginResponse>>(
    initialFetchedContent
  );
  const [tasks, setTasks] = useState<FetchedContent<IGetTasksResponse>>(
    initialFetchedContent
  );
  const [courses, setCourses] = useState<FetchedContent<ICourseListResponse>>(
    initialFetchedContent
  );
  const [students, setStudents] = useState<FetchedContent<IStudentsResponse>>(
    initialFetchedContent
  );
  const [userTasks, setUserTasks] = useState<
    FetchedContent<IGetUserTasksResponse>
  >(initialFetchedContent);

  const startLogin = () => {
    setLoginData(loadingFetchedContent);
  };

  const logIn = (loginResponse: ILoginResponse) => {
    setLoginData(loadedFetchedContent(loginResponse));
  };

  const errorLogin = (error: string) => {
    setLoginData(errorFetchedContent(error));
  };

  const reloadCourses = async () => {
    if (loginData.content === null) {
      setCourses(errorFetchedContent("No login data"));
      return;
    }

    setCourses(loadingFetchedContent);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const coursesResult = await fetch(
        SERVER_ADDRESS +
          "/api/session/" +
          loginData.content.jsossessid +
          "/courses",
        {
          headers,
        }
      );

      const courses = (await coursesResult.json()) as ICourseListResponse;

      setCourses(loadedFetchedContent(courses));
    } catch (error) {
      setCourses(errorFetchedContent(error));
    }
  };

  const reloadTasks = async () => {
    if (loginData.content === null) {
      setTasks(errorFetchedContent("No login data"));
      return;
    }

    setTasks(loadingFetchedContent);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const tasksResult = await fetch(
        SERVER_ADDRESS +
          "/api/session/" +
          loginData.content.jsossessid +
          "/tasks/all",
        {
          headers,
        }
      );

      const tasks = (await tasksResult.json()) as IGetTasksResponse;

      setTasks(loadedFetchedContent(tasks));
    } catch (error) {
      setTasks(errorFetchedContent(error));
    }
  };

  const reloadStudents = async () => {
    if (loginData.content === null) {
      setStudents(errorFetchedContent("No login data"));
      return;
    }

    setStudents(loadingFetchedContent);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const studentsResult = await fetch(
        SERVER_ADDRESS +
          "/api/session/" +
          loginData.content.jsossessid +
          "/students",
        {
          headers,
        }
      );

      const students = (await studentsResult.json()) as IStudentsResponse;

      setStudents(loadedFetchedContent(students));
    } catch (error) {
      setStudents(errorFetchedContent(error));
    }
  };

  const reloadUserTasks = async () => {
    if (loginData.content === null) {
      setUserTasks(errorFetchedContent("No login data"));
      return;
    }

    setUserTasks(loadingFetchedContent);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const userTasksResult = await fetch(
        SERVER_ADDRESS +
          "/api/session/" +
          loginData.content.jsossessid +
          "/tasks",
        {
          headers,
        }
      );

      const userTasks = (await userTasksResult.json()) as IGetUserTasksResponse;

      setUserTasks(loadedFetchedContent(userTasks));
    } catch (error) {
      setUserTasks(errorFetchedContent(error));
    }
  };

  const reloadAll = async () => {
    reloadCourses();
    reloadTasks();
    reloadStudents();
    reloadUserTasks();
  };

  useEffect(() => {
    if (loginData.content !== null) {
      reloadAll();
    }
  }, [loginData]);

  console.log(tasks);
  console.log(courses);
  console.log(userTasks);
  console.log(students);

  return (
    <AppContext.Provider
      value={{
        startLogin,
        logIn,
        errorLogin,

        reloadCourses,
        reloadTasks,
        reloadStudents,
        reloadUserTasks,
        reloadAll,

        loginData,
        courses,
        tasks,
        students,
        userTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
