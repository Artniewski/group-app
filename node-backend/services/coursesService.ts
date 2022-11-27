import { JSDOM } from "jsdom";
import fetch from "node-fetch";

import { JSOS_CLASSES_PAGE_URL, JsosError } from "../index.js";

const getCourseIdList = async (
  JSOSSESSID: string
) => {
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

  const courseIdList = new Set<string>()

  document.querySelectorAll("tr.kliknij>td:first-child").forEach((course) => {
    courseIdList.add(course.innerHTML.split("<")[0].slice(0, -1))
  });

  return Array.from(courseIdList);
};

export default getCourseIdList;
