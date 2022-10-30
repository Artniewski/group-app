import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import getAuthCookies from "./auth.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

interface AuthRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  YII_CSRF_TOKEN: string;
  idSluchacza: string;
  JSOSSESSID: string;
}

app.post("/auth", async (req, res) => {
  const { username, password } = req.body as AuthRequest;

  const [YII_CSRF_TOKEN, idSluchacza, JSOSSESSID] = await getAuthCookies(
    username,
    password
  );

  const responseBody: AuthResponse = {
    YII_CSRF_TOKEN,
    idSluchacza,
    JSOSSESSID,
  };

  res.status(200).json(responseBody);
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
