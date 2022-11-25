/**
 * Interface for user. For now only one field is requiered. Feel free to expand it.
 */
export interface IUserData {
  isOldMan : boolean
}

/**
 * Interface prototype for course.
 */
export interface ICourseData {
  courseCode : string
  courseName : string
}

/**
 * Concrete implementation.
 */
export class UserData implements IUserData{
  isOldMan: boolean = false;
}
 