import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import getAuthCookies from "./auth.js";
import getIdSluchacza from "./id.js";

export const JSOS_MAIN_PAGE_URL = "https://jsos.pwr.edu.pl/";

const app = express();

app.use(cors());
app.use(bodyParser.json());

interface AuthRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  YII_CSRF_TOKEN: string;
  JSOSSESSID: string;
}

type IDRequest = AuthResponse;

interface IDResponse {
  idSluchacza: string;
}

app.post("/auth", async (req, res) => {
  const { username, password } = req.body as AuthRequest;

  const [YII_CSRF_TOKEN, JSOSSESSID] = await getAuthCookies(username, password);

  const responseBody: AuthResponse = {
    YII_CSRF_TOKEN,
    JSOSSESSID,
  };

  res.status(200).json(responseBody);
});

app.post("/id", async (req, res) => {
  const { YII_CSRF_TOKEN, JSOSSESSID } = req.body as IDRequest;

  const idSluchacza = await getIdSluchacza(YII_CSRF_TOKEN, JSOSSESSID);

  const responseBody: IDResponse = {
    idSluchacza,
  };

  res.status(200).json(responseBody);
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
