import { Request, Response } from "express";

import { JsosError } from "../index.js";
import { AuthResponse } from "./authController.js";

import getIdSluchacza from "../services/idService.js";
import getCourseIdList from "../services/coursesService.js";

type CourseListRequest = AuthResponse;

export interface ICourseData {
  courseCode : string
  courseName : string
}

interface CourseListResponse {
  idSluchacza: string;
  courseList: ICourseData[];
}

const coursesEndpoint = async (req: Request, res: Response) => {
  const { JSOSSESSID } = req.body as CourseListRequest;

  if (!JSOSSESSID) {
    res.status(400).json({ message: "Missing JSOSSESSID" });
    return;
  }

  try {
    const idSluchacza = await getIdSluchacza(JSOSSESSID);
    const courseList = await getCourseIdList(JSOSSESSID);

    const responseBody: CourseListResponse = {
      idSluchacza,
      courseList,
    };

    res.status(200).json(responseBody);
  } catch (error) {
    if (error instanceof JsosError) {
      res.status(500).json({ message: "JSOS is not available currently" });
    } else {
      res.status(500).json({ message: "Unexpected server error" });
    }
  }
};

export default coursesEndpoint;
