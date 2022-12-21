export interface ICourse {
  courseCode: string;
  courseName: string;
}

export interface ISendTask {
  course: ICourse;
  taskListNumber: number;
  taskNumber: number;
}

export interface IGetCourse {
  id: string;
  name: string;
}

export interface IGetTaskList {
  id: number;
  listNumber: number;
  course: IGetCourse;
}

export interface IGetTask {
  id: number;
  taskNumber: number;
  taskList: IGetTaskList;
}

export interface IStudent {
  idSluchacza: string;
  name: string;
  votes: number;
}
