import { JSDOM } from "jsdom";
import fetch from "node-fetch";

import { JSOS_CLASSES_PAGE_URL } from "../index.js";

import { JsosError } from "../common/CommonDataTypes.js";

const getIdSluchacza = async (JSOSSESSID: string) => {
  const zajeciaPage = await fetch(JSOS_CLASSES_PAGE_URL, {
    headers: {
      cookie: `JSOSSESSID=${JSOSSESSID}`,
    },
  });

  if (!zajeciaPage.ok) {
    throw new JsosError("JSOS is not available");
  }

  const zajeciaPageText = await zajeciaPage.text();
  const dom = new JSDOM(zajeciaPageText);
  const document = dom.window.document;

  const idSluchacza = (document.querySelector("#wyborPK") as HTMLSelectElement)
    .value;

  return idSluchacza;
};

export default getIdSluchacza;
