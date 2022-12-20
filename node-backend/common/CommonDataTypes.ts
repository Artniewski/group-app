export interface IAuthCookies {
  JSOSSESSID: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "AuthError";
  }
}

export class JsosError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "JsosError";
  }
}

export interface IAuthRequest {
  username: string;
  password: string;
}

export interface IAuthResponse {
  JSOSSESSID: string;
}

export type ICourseListRequest = IAuthResponse;

export interface ICourseData {
  courseCode : string
  courseName : string
}

export interface ICourseListResponse {
  idSluchacza: string;
  courseList: ICourseData[];
}

export type IIdRequest = IAuthResponse;

export interface IIdResponse {
  idSluchacza: string;
}
||||||| 27f5b77
=======
export interface IAuthCookies {
  jsossessid: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "AuthError";
  }
}

export class JsosError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "JsosError";
  }
}

export interface IAuthRequest {
  username: string;
  password: string;
}

export type IAuthResponse = IAuthCookies;

export type ICourseListRequest = IAuthResponse;

export interface ICourseData {
  courseCode: string;
  courseName: string;
}

export interface ICourseListResponse {
  idSluchacza: string;
  courseList: ICourseData[];
}

export type IIdRequest = IAuthResponse;

export interface IIdResponse {
  idSluchacza: string;
}

export type IMajorRequest = IAuthResponse;

export interface IMajorResponse {
  idSluchacza: string;
  major: string;
  semester: number;
}
