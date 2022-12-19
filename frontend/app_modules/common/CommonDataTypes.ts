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

/**
 * Interface prototype for course.
 */
export interface IExerciseData {
  courseCode: string;
  courseName: string;
}
