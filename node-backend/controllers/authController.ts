import { Request, Response } from "express";

import { JsosError } from "../index.js";
import getAuthCookies from "../services/authService.js";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "AuthError";
  }
}

interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  JSOSSESSID: string;
}

const authEndpoint = async (req: Request, res: Response) => {
  const { username, password } = req.body as AuthRequest;

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

    const responseBody: AuthResponse = {
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
