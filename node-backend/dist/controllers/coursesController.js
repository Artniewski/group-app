import getIdSluchacza from "../services/idService.js";
import getCourseIdList from "../services/coursesService.js";
import { JsosError, } from "../common/CommonDataTypes.js";
const coursesEndpoint = async (req, res) => {
    const { JSOSSESSID } = req.body;
    if (!JSOSSESSID) {
        res.status(400).json({ message: "Missing JSOSSESSID" });
        return;
    }
    try {
        const idSluchacza = await getIdSluchacza(JSOSSESSID);
        const courseList = await getCourseIdList(JSOSSESSID);
        const responseBody = {
            idSluchacza,
            courseList,
        };
        res.status(200).json(responseBody);
    }
    catch (error) {
        if (error instanceof JsosError) {
            res.status(500).json({ message: "JSOS is not available currently" });
        }
        else {
            res.status(500).json({ message: "Unexpected server error" });
        }
    }
};
export default coursesEndpoint;
//# sourceMappingURL=coursesController.js.map