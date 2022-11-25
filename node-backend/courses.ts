import { JSDOM } from "jsdom";
import { JSOS_CLASSES_PAGE_URL } from "./index.js";
import fetch from "node-fetch";

const getCourseIdList = async (
  YII_CSRF_TOKEN: string,
  JSOSSESSID: string
) => {
  const zajeciaPage = await fetch(JSOS_CLASSES_PAGE_URL, {
    headers: {
      cookie: `YII_CSRF_TOKEN=${YII_CSRF_TOKEN}; JSOSSESSID=${JSOSSESSID}`,
    },
  });

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
