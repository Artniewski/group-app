import { Request, Response } from "express";

import getIdSluchacza from "../services/idService.js";

import {
  JsosError,
  IIdRequest,
  IIdResponse,
} from "../common/CommonDataTypes.js";

const idEndpoint = async (req: Request, res: Response) => {
  const { jsossessid } = req.body as IIdRequest;

  if (!jsossessid) {
    res.status(400).json({ message: "Missing JSOSSESSID" });
    return;
  }

  try {
    const idSluchacza = await getIdSluchacza(jsossessid);

    const responseBody: IIdResponse = {
      idSluchacza,
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

export default idEndpoint;