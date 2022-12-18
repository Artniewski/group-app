import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authEndpoint from "./controllers/authController.js";
import idEndpoint from "./controllers/idController.js";
import coursesEndpoint from "./controllers/coursesController.js";

const SERVER_PORT = 8080;

export const JSOS_MAIN_PAGE_URL = "https://jsos.pwr.edu.pl/";
export const JSOS_CLASSES_PAGE_URL =
  JSOS_MAIN_PAGE_URL + "index.php/student/zajecia";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/auth", authEndpoint);
app.post("/id", idEndpoint);
app.post("/courseList", coursesEndpoint);

app.get("*", async (_, res) => {
  res
    .status(404)
    .json({ message: "There are no GET endpoints on this server" });
});

app.post("*", async (_, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(SERVER_PORT, () => {
  console.log("Server ready and listening on port", SERVER_PORT);
});
