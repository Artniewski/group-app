import { JSDOM } from "jsdom";
import { JSOS_MAIN_PAGE_URL } from "./index.js";
import fetch from "node-fetch";

const getIdSluchacza = async (
  YII_CSRF_TOKEN: string,
  JSOSSESSID: string
) => {
  const zajeciaPageUrl = JSOS_MAIN_PAGE_URL + "index.php/student/zajecia";

  const zajeciaPage = await fetch(zajeciaPageUrl, {
    headers: {
      cookie: `YII_CSRF_TOKEN=${YII_CSRF_TOKEN}; JSOSSESSID=${JSOSSESSID}`,
    },
  });

  const zajeciaPageText = await zajeciaPage.text();
  const dom = new JSDOM(zajeciaPageText);
  const document = dom.window.document;

  const idSluchacza = (document.querySelector("#wyborPK") as HTMLSelectElement)
    .value;

  return idSluchacza;
};

export default getIdSluchacza;
