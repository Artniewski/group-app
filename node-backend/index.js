import fetch from "node-fetch";

if (process.argv.length < 4) {
  console.log("You have to provide username and password");
  process.exit(-1);
}

const username = process.argv[2];
const password = process.argv[3];

const setCookieParser = (response) => {
  return response.headers
    .get("set-cookie")
    .split(";")
    .map((item) => item.trim().split("=").map(i => i.split(", ")))
    .flat(3);
};

const getSetCookie = (parsedCookies, setCookie) => {
  for (let parsedCookiesIdx = 0; parsedCookiesIdx < parsedCookies.length; parsedCookiesIdx++) {
    if (parsedCookies[parsedCookiesIdx] === setCookie) {
      return parsedCookies[parsedCookiesIdx + 1];
    }
  }
};

const jsosMainPageUrl = "https://jsos.pwr.edu.pl/";
const loginAsStudentUrl = jsosMainPageUrl + "index.php/site/loginAsStudent";

const jsosMainPage = await fetch(jsosMainPageUrl);

const YII_CSRF_TOKEN = getSetCookie(setCookieParser(jsosMainPage), "YII_CSRF_TOKEN");
const TMP_JSOSSESSID = getSetCookie(setCookieParser(jsosMainPage), "JSOSSESSID");

const loginAsStudent = await fetch(loginAsStudentUrl, {
  "headers": {
    "cookie": `JSOSSESSID=${TMP_JSOSSESSID}; YII_CSRF_TOKEN=${YII_CSRF_TOKEN};`,
  },
});

const oauthUrlSearchParams = new URL(loginAsStudent.url).searchParams;
const oauth_token = oauthUrlSearchParams.get("oauth_token");
const oauth_consumer_key = oauthUrlSearchParams.get("oauth_consumer_key");

const authPageUrl = `https://oauth.pwr.edu.pl/oauth/authenticate?0-1.IFormSubmitListener-authenticateForm&oauth_token=${oauth_token}&oauth_consumer_key=${oauth_consumer_key}&oauth_locale=pl`;

const authPage = await fetch(authPageUrl, {
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": `id1_hf_0=&oauth_request_url=http%3A%2F%2Foauth.pwr.edu.pl%2Foauth%2Fauthenticate&oauth_consumer_key=${oauth_consumer_key}&oauth_token=${oauth_token}&oauth_locale=pl&oauth_callback_url=https%3A%2F%2Fjsos.pwr.edu.pl%2Findex.php%2Fsite%2FloginAsStudent&oauth_symbol=EIS&username=${username}&password=${password}&authenticateButton=Zaloguj`,
  "method": "POST",
  "redirect": "manual"
});

const JSESSIONID = getSetCookie(setCookieParser(authPage), "JSESSIONID");

const loginAsStudentAuthUrl = authPage.headers.get("location");

const loginAsStudentAuth = await fetch(loginAsStudentAuthUrl, {
  "headers": {
    "cookie": `JSOSSESSID=${TMP_JSOSSESSID}; YII_CSRF_TOKEN=${YII_CSRF_TOKEN};`,
  },
  "redirect": "manual"
});

const idSluchacza = getSetCookie(setCookieParser(loginAsStudentAuth), "idSluchacza");
const JSOSSESSID = getSetCookie(setCookieParser(loginAsStudentAuth), "JSOSSESSID");

// ======================================================================================
//  Auth succesfull you can request jsos pages by sending YII_CSRF_TOKEN, idSluchacza and
//  JSOSSESSID cookies in headers.
// ======================================================================================

const indeksPageUrl = jsosMainPageUrl + "index.php/student/zajecia";

const indeksPage = await fetch(indeksPageUrl, {
  "headers": {
    "cookie": `YII_CSRF_TOKEN=${YII_CSRF_TOKEN}; idSluchacza=${idSluchacza}; JSOSSESSID=${JSOSSESSID}`,
  },
});

console.log(await indeksPage.text());
