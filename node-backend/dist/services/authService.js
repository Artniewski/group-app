import { JSOS_MAIN_PAGE_URL } from "../index.js";
import fetch from "node-fetch";
import { JsosError, AuthError } from "../common/CommonDataTypes.js";
const setCookieParser = (response) => {
    return response.headers
        .get("set-cookie")
        .split(";")
        .map((item) => item
        .trim()
        .split("=")
        .map((subItem) => subItem.split(", ")))
        .flat(3);
};
const getSetCookie = (parsedCookies, setCookie) => {
    for (let parsedCookiesIdx = 0; parsedCookiesIdx < parsedCookies.length; parsedCookiesIdx++) {
        if (parsedCookies[parsedCookiesIdx] === setCookie) {
            return parsedCookies[parsedCookiesIdx + 1];
        }
    }
};
const getAuthCookies = async (username, password) => {
    const loginAsStudentUrl = JSOS_MAIN_PAGE_URL + "index.php/site/loginAsStudent";
    const jsosMainPage = await fetch(JSOS_MAIN_PAGE_URL);
    if (!jsosMainPage.ok) {
        throw new JsosError("JSOS is not available");
    }
    const TMP_JSOSSESSID = getSetCookie(setCookieParser(jsosMainPage), "JSOSSESSID");
    const loginAsStudent = await fetch(loginAsStudentUrl, {
        headers: {
            cookie: `JSOSSESSID=${TMP_JSOSSESSID};`,
        },
    });
    if (!loginAsStudent.ok) {
        throw new JsosError("JSOS is not available");
    }
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
    if (authPage.ok) {
        throw new AuthError("Wrong username or password");
    }
    if (authPage.status != 302) {
        throw new JsosError("JSOS is not available");
    }
    const loginAsStudentAuthUrl = authPage.headers.get("location");
    const loginAsStudentAuth = await fetch(loginAsStudentAuthUrl, {
        headers: {
            cookie: `JSOSSESSID=${TMP_JSOSSESSID};`,
        },
        redirect: "manual",
    });
    if (authPage.status != 302) {
        throw new JsosError("JSOS is not available");
    }
    const JSOSSESSID = getSetCookie(setCookieParser(loginAsStudentAuth), "JSOSSESSID");
    return JSOSSESSID;
};
export default getAuthCookies;
//# sourceMappingURL=authService.js.map