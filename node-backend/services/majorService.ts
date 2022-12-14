import { JSDOM } from "jsdom";
import fetch from "node-fetch";

import { JSOS_WPISY_PAGE_URL, JSOS_INDEKS_PAGE_URL } from "../index.js";

import { JsosError } from "../common/CommonDataTypes.js";

export const getMajor = async (JSOSSESSID: string) => {
  const indeksPage = await fetch(JSOS_INDEKS_PAGE_URL, {
    headers: {
      cookie: `JSOSSESSID=${JSOSSESSID}`,
    },
  });

  if (!indeksPage.ok) {
    throw new JsosError("JSOS is not available");
  }

  const indeksPageText = await indeksPage.text();
  const dom = new JSDOM(indeksPageText);
  const document = dom.window.document;

  const major = (
    document.querySelector(
      "#design_1>tbody>tr:nth-child(2)>td"
    ) as HTMLTableCellElement
  ).textContent;

  return major;
};

export const getSemester = async (JSOSSESSID: string) => {
  const wpisyPage = await fetch(JSOS_WPISY_PAGE_URL, {
    headers: {
      cookie: `JSOSSESSID=${JSOSSESSID}`,
    },
  });

  if (!wpisyPage.ok) {
    throw new JsosError("JSOS is not available");
  }

  const wpisyPageText = await wpisyPage.text();
  const dom = new JSDOM(wpisyPageText);
  const document = dom.window.document;

  const semester = (
    document.querySelector(
      "#slider_wpis>li:last-child>table>tbody>tr:nth-child(3)"
    ) as HTMLTableCellElement
  ).textContent;

  return parseInt(semester);
};
