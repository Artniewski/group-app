import { JSDOM } from "jsdom";
import fetch from "node-fetch";

import { JSOS_CLASSES_PAGE_URL } from "../index.js";

import { ICourseData, JsosError } from "../common/CommonDataTypes.js";

const getCourseIdList = async (JSOSSESSID: string) => {
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

  const courseIdList: ICourseData[] = [];

  document
    .querySelectorAll("tr.kliknij>td:first-child")
    .forEach((course: HTMLTableCellElement) => {
      const [courseCode, courseName] = course.innerHTML.split("<br>");

      let onList = false;

      for (const courseData of courseIdList) {
        if (courseData.courseCode === courseCode.slice(0, -1)) {
          onList = true;
        }
      }

      if (!onList) {
        courseIdList.push({ courseCode: courseCode.slice(0, -1), courseName });
      }
    });

  return Array.from(courseIdList);
};

export default getCourseIdList;
