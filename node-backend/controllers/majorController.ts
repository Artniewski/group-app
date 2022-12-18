import { Request, Response } from "express";

import getIdSluchacza from "../services/idService.js";
import { getMajor, getSemester } from "../services/majorService.js";

import {
  JsosError,
  IMajorRequest,
  IMajorResponse,
} from "../common/CommonDataTypes.js";

const majorEndpoint = async (req: Request, res: Response) => {
  const { jsossessid } = req.body as IMajorRequest;

  if (!jsossessid) {
    res.status(400).json({ message: "Missing JSOSSESSID" });
    return;
  }

  try {
    const idSluchacza = await getIdSluchacza(jsossessid);
    const major = await getMajor(jsossessid);
    const semester = await getSemester(jsossessid);

    const responseBody: IMajorResponse = {
      idSluchacza,
      major,
      semester,
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

export default majorEndpoint;
