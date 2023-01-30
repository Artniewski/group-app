import { IGetTask, ISendTask, ICourse, IStudent } from "./DataTypes";

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  jsossessid: string;
  isStarosta: boolean;
}

export type IGetUserTasksRequest = null;

export interface IGetUserTasksResponse {
  offeredTasks: IGetTask[];
  requestedTasks: IGetTask[];
}

export type ICourseListRequest = null;

export type ICourseListResponse = ICourse[];

export interface IAddTasksRequest {
  courseCode: string;
  taskListNumber: number;
  taskCount: number;
}

export type IAddTasksResponse = boolean;

export type IStudentsRequest = null;

export type IStudentsResponse = IStudent[];

export type IGetTasksRequest = null;

export type IGetTasksResponse = IGetTask[];

export interface IAddOwnedAndNeededTasksRequest {
  offeredTasks: ISendTask[];
  requestedTasks: ISendTask[];
}

export type IAddOwnedAndNeededTasksResponse = null;

export type IVoteForOldmanRequest = null;

export type IVoteForOldmanResponse = null;

export type IGetOldmanRequest = null;

export type IGetOldmanResponse = null;
