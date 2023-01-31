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

interface IStudents {
  array: IStudent[];
}

interface ICourses {
  array: ICourseListResponse;
}

interface ITasks {
  array: IGetTasksResponse;
}

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
  tasks: FetchedContent<ITasks>;
  courses: FetchedContent<ICourses>;
  students: FetchedContent<IStudents>;
  userTasks: FetchedContent<IGetUserTasksResponse>;

  pickedOldman: IStudent | null;
  chosenOldman: IStudent | null;

  pickOldman: (student: IStudent) => void;
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

  pickOldman: emptyFunction,
});

interface Props {
  children?: React.ReactNode;
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [loginData, setLoginData] = useState<FetchedContent<ILoginResponse>>(
    initialFetchedContent
  );
  const [tasks, setTasks] = useState<FetchedContent<ITasks>>(
    initialFetchedContent
  );
  const [courses, setCourses] = useState<FetchedContent<ICourses>>(
    initialFetchedContent
  );
  const [students, setStudents] = useState<FetchedContent<IStudents>>(
    initialFetchedContent
  );
  const [userTasks, setUserTasks] = useState<
    FetchedContent<IGetUserTasksResponse>
  >(initialFetchedContent);
  const [pickedOldman, setPickedOldman] = useState<IStudent | null>(null);
  const [chosenOldman, setChosenOldman] = useState<IStudent | null>(null);

  const pickOldman = (student: IStudent) => {
    if (students.content !== null) {
      let newStudents = students.content.array;

      if (pickedOldman !== null) {
        newStudents = newStudents.map((stud) =>
          stud.idSluchacza === pickedOldman.idSluchacza
            ? { ...stud, votes: stud.votes - 1 }
            : stud
        );
      }

      newStudents = newStudents.map((stud) =>
        stud.idSluchacza === student.idSluchacza
          ? { ...stud, votes: stud.votes + 1 }
          : stud
      );

      setStudents(loadedFetchedContent({ array: newStudents }));
      setPickedOldman(student);
    }
  };

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

      setCourses(loadedFetchedContent({ array: courses }));
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

      console.log(tasksResult);

      const tasks = (await tasksResult.json()) as IGetTasksResponse;

      setTasks(loadedFetchedContent({array: tasks}));
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

      setStudents(loadedFetchedContent({ array: students }));
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

  useEffect(() => {
    if (students.content !== null && students.content.array.length > 0) {
      let chosenOldman = students.content.array[0];
      let chosenOldmanVotes = chosenOldman.votes;

      for (const student of students.content.array) {
        if (student.votes > chosenOldmanVotes) {
          chosenOldman = student;
          chosenOldmanVotes = student.votes;
        }
      }

      setChosenOldman(chosenOldman);
    }
  }, [students, setChosenOldman]);

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

        chosenOldman,
        pickedOldman,

        pickOldman,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
