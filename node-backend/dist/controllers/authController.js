import getAuthCookies from "../services/authService.js";
import { JsosError, AuthError, } from "../common/CommonDataTypes.js";
const authEndpoint = async (req, res) => {
    const { username, password } = req.body;
    if (!username) {
        res.status(400).json({ message: "Missing username" });
        return;
    }
    if (!password) {
        res.status(400).json({ message: "Missing password" });
        return;
    }
    try {
        const jsossessid = await getAuthCookies(username, password);
        const responseBody = {
            jsossessid,
        };
        res.status(200).json(responseBody);
    }
    catch (error) {
        if (error instanceof JsosError) {
            res.status(500).json({ message: "JSOS is not available currently" });
        }
        else if (error instanceof AuthError) {
            res.status(401).json({ message: "Invalid credentials" });
        }
        else {
            res.status(500).json({ message: "Unexpected server error" });
        }
    }
};
export default authEndpoint;
//# sourceMappingURL=authController.js.map