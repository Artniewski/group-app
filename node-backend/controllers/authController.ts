import { Request, Response } from "express";

import getAuthCookies from "../services/authService.js";

import {
  JsosError,
  IAuthRequest,
  IAuthResponse,
  AuthError,
} from "../common/CommonDataTypes.js";

const authEndpoint = async (req: Request, res: Response) => {
  const { username, password } = req.body as IAuthRequest;

  if (!username) {
    res.status(400).json({ message: "Missing username" });
    return;
  }

  if (!password) {
    res.status(400).json({ message: "Missing password" });
    return;
  }

  try {
    const JSOSSESSID = await getAuthCookies(username, password);

    const responseBody: IAuthResponse = {
      JSOSSESSID,
    };

    res.status(200).json(responseBody);
  } catch (error) {
    if (error instanceof JsosError) {
      res.status(500).json({ message: "JSOS is not available currently" });
    } else if (error instanceof AuthError) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      res.status(500).json({ message: "Unexpected server error" });
    }
  }
};

export default authEndpoint;
||||||| 27f5b77
=======
import { Request, Response } from "express";

import getAuthCookies from "../services/authService.js";

import {
  JsosError,
  IAuthRequest,
  IAuthResponse,
  AuthError,
} from "../common/CommonDataTypes.js";

const authEndpoint = async (req: Request, res: Response) => {
  const { username, password } = req.body as IAuthRequest;

  if (!username) {
    res.status(400).json({ message: "Missing username" });
    return;
  }

  if (!password) {
    res.status(400).json({ message: "Missing password" });
    return;
  }

  try {
    const jsossessid = await getAuthCookies(username, password);

    const responseBody: IAuthResponse = {
      jsossessid,
    };

    res.status(200).json(responseBody);
  } catch (error) {
    if (error instanceof JsosError) {
      res.status(500).json({ message: "JSOS is not available currently" });
    } else if (error instanceof AuthError) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      console.log(error)
      res.status(500).json({ message: "Unexpected server error: "+error });
    }
  }
};

export default authEndpoint;
||||||| f7fac0f
=======
import { Request, Response } from "express";

import getAuthCookies from "../services/authService.js";

import {
  JsosError,
  IAuthRequest,
  IAuthResponse,
  AuthError,
} from "../common/CommonDataTypes.js";

const authEndpoint = async (req: Request, res: Response) => {
  const { username, password } = req.body as IAuthRequest;

  if (!username) {
    res.status(400).json({ message: "Missing username" });
    return;
  }

  if (!password) {
    res.status(400).json({ message: "Missing password" });
    return;
  }

  try {
    const jsossessid = await getAuthCookies(username, password);

    const responseBody: IAuthResponse = {
      jsossessid,
    };

    res.status(200).json(responseBody);
  } catch (error) {
    if (error instanceof JsosError) {
      res.status(500).json({ message: "JSOS is not available currently" });
    } else if (error instanceof AuthError) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      res.status(500).json({ message: "Unexpected server error" });
    }
  }
};

export default authEndpoint;
