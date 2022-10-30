import { JSDOM } from "jsdom";
import ical from "ical";

const JSOS_MAIN_PAGE_URL = "https://jsos.pwr.edu.pl/";

interface MyClass {
  prowadzacy: string;
  kurs: string;
  kodGrupy: string;
  termin: string;
  godziny: string;
  ects: string;
}

export const getUserClasses = async (
  YII_CSRF_TOKEN: string,
  idSluchacza: string,
  JSOSSESSID: string
) => {
  const indeksPageUrl = JSOS_MAIN_PAGE_URL + "index.php/student/zajecia";

  const indeksPage = await fetch(indeksPageUrl, {
    headers: {
      cookie: `YII_CSRF_TOKEN=${YII_CSRF_TOKEN}; idSluchacza=${idSluchacza}; JSOSSESSID=${JSOSSESSID}`,
    },
  });

  const indeksPageText = await indeksPage.text();

  const dom = new JSDOM(indeksPageText);
  const document = dom.window.document;

  const classes: MyClass[] = [];

  document.querySelectorAll(".listaTable>tbody>tr").forEach((tr) => {
    const mappedPerson = {
      prowadzacy: tr.querySelector("td:nth-of-type(2)").textContent,
      kurs: tr.querySelector("td:nth-of-type(1)").textContent,
      kodGrupy: tr.querySelector("td:nth-of-type(3)").textContent,
      termin: tr.querySelector("td:nth-of-type(4)").textContent,
      godziny: tr.querySelector("td:nth-of-type(5)").textContent,
      ects: tr.querySelector("td:nth-of-type(6)").textContent,
    };

    classes.push(mappedPerson);
  });

  return classes;
};

export const getUserCalendar = async (
  YII_CSRF_TOKEN: string,
  idSluchacza: string,
  JSOSSESSID: string
) => {
  const calendarPage = await fetch(
    "https://jsos.pwr.edu.pl/index.php/student/zajecia/iCalendar",
    {
      headers: {
        cookie: `YII_CSRF_TOKEN=${YII_CSRF_TOKEN}; idSluchacza=${idSluchacza}; JSOSSESSID=${JSOSSESSID}`,
      },
    }
  );

  const calendarText = await calendarPage.text();
  const calendar = ical.parseICS(calendarText);

  return calendar;
};
