export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  jsossessid: string;
  isStarosta: boolean;
}

export interface IAddTasksRequest {
  courseCode: string;
  taskListNumber: number;
  taskCount: number;
}

export type ICourseListResponse = ICourseData[];

export type IExercisesReponse = IExerciseData[];

export type IUsersResponse = IUserData[];

/**
 * Interface for user. For now only one field is requiered. Feel free to expand it.
 */
export interface IUserData {
  userId: string;
  name: string;
}

/**
 * Interface prototype for course.
 */
export interface ICourseData {
  courseCode: string;
  courseName: string;
}

export interface IUserTasks {
  offeredTasks: IExerciseData[];
  requestedTasks: IExerciseData[];
}

export interface IExerciseListData {
  id: number;
  listNumber: number;
  course: {
    id: string;
    name: string;
  };
}

/**
 * Interface prototype for exercise.
 */
export interface IExerciseData {
  id: number;
  taskNumber: number;
  taskList: IExerciseListData;
}

export interface ISendExerciseData {
  taskNumber: number;
  taskListNumber: number;
  course: ICourseData;
}

export interface ISendExercisesReq {
  offeredTasks: ISendExerciseData[];
  requestedTasks: ISendExerciseData[];
}
