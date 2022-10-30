import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import ical from "ical";

import { Response as NFResponse } from "node-fetch";

const JSOS_MAIN_PAGE_URL = "https://jsos.pwr.edu.pl/";

// ======================================================================================

const setCookieParser = (response: NFResponse) => {
  return response.headers
    .get("set-cookie")
    .split(";")
    .map((item) =>
      item
        .trim()
        .split("=")
        .map((i) => i.split(", "))
    )
    .flat(3);
};

const getSetCookie = (parsedCookies: string[], setCookie: string) => {
  for (
    let parsedCookiesIdx = 0;
    parsedCookiesIdx < parsedCookies.length;
    parsedCookiesIdx++
  ) {
    if (parsedCookies[parsedCookiesIdx] === setCookie) {
      return parsedCookies[parsedCookiesIdx + 1];
    }
  }
};

const getAuthCookies = async (username: string, password: string) => {
  const loginAsStudentUrl =
    JSOS_MAIN_PAGE_URL + "index.php/site/loginAsStudent";

  const jsosMainPage = await fetch(JSOS_MAIN_PAGE_URL);
  const YII_CSRF_TOKEN = getSetCookie(
    setCookieParser(jsosMainPage),
    "YII_CSRF_TOKEN"
  );
  const TMP_JSOSSESSID = getSetCookie(
    setCookieParser(jsosMainPage),
    "JSOSSESSID"
  );

  const loginAsStudent = await fetch(loginAsStudentUrl, {
    headers: {
      cookie: `JSOSSESSID=${TMP_JSOSSESSID}; YII_CSRF_TOKEN=${YII_CSRF_TOKEN};`,
    },
  });

  const oauthUrlSearchParams = new URL(loginAsStudent.url).searchParams;
  const oauth_token = oauthUrlSearchParams.get("oauth_token");
  const oauth_consumer_key = oauthUrlSearchParams.get("oauth_consumer_key");

  const authPageUrl = `https://oauth.pwr.edu.pl/oauth/authenticate?0-1.IFormSubmitListener-authenticateForm&oauth_token=${oauth_token}&oauth_consumer_key=${oauth_consumer_key}&oauth_locale=pl`;

  const authPage = await fetch(authPageUrl, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: `id1_hf_0=&oauth_request_url=http%3A%2F%2Foauth.pwr.edu.pl%2Foauth%2Fauthenticate&oauth_consumer_key=${oauth_consumer_key}&oauth_token=${oauth_token}&oauth_locale=pl&oauth_callback_url=https%3A%2F%2Fjsos.pwr.edu.pl%2Findex.php%2Fsite%2FloginAsStudent&oauth_symbol=EIS&username=${username}&password=${password}&authenticateButton=Zaloguj`,
    method: "POST",
    redirect: "manual",
  });

  const loginAsStudentAuthUrl = authPage.headers.get("location");

  const loginAsStudentAuth = await fetch(loginAsStudentAuthUrl, {
    headers: {
      cookie: `JSOSSESSID=${TMP_JSOSSESSID}; YII_CSRF_TOKEN=${YII_CSRF_TOKEN};`,
    },
    redirect: "manual",
  });

  const idSluchacza = getSetCookie(
    setCookieParser(loginAsStudentAuth),
    "idSluchacza"
  );
  const JSOSSESSID = getSetCookie(
    setCookieParser(loginAsStudentAuth),
    "JSOSSESSID"
  );

  return [YII_CSRF_TOKEN, idSluchacza, JSOSSESSID];
};

interface MyClass {
  prowadzacy: string;
  kurs: string;
  kodGrupy: string;
  termin: string;
  godziny: string;
  ects: string;
}

const getUserClasses = async (
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

  let classes: MyClass[] = [];

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

const getUserCalendar = async (
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

// ======================================================================================

if (process.argv.length < 4) {
  console.log("You have to provide username and password");
  process.exit(-1);
}

const username = process.argv[2];
const password = process.argv[3];

const [YII_CSRF_TOKEN, idSluchacza, JSOSSESSID] = await getAuthCookies(
  username,
  password
);

const classes = await getUserClasses(YII_CSRF_TOKEN, idSluchacza, JSOSSESSID);
const calendar = await getUserCalendar(YII_CSRF_TOKEN, idSluchacza, JSOSSESSID);

console.log(classes);
console.log(calendar);
