import { JSOS_MAIN_PAGE_URL } from "./index.js";
import fetch, { Response as NFResponse } from "node-fetch";

const setCookieParser = (response: NFResponse) => {
  return response.headers
    .get("set-cookie")
    .split(";")
    .map((item) =>
      item
        .trim()
        .split("=")
        .map((subItem) => subItem.split(", "))
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

  const JSOSSESSID = getSetCookie(
    setCookieParser(loginAsStudentAuth),
    "JSOSSESSID"
  );

  return [YII_CSRF_TOKEN, JSOSSESSID];
};

export default getAuthCookies;
