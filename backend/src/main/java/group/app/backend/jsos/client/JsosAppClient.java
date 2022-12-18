package group.app.backend.jsos.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import group.app.backend.jsos.dto.AuthRequestDTO;
import group.app.backend.jsos.dto.AuthResponseDTO;
import group.app.backend.jsos.dto.CourseListDTO;
import group.app.backend.jsos.dto.SessionRequestDTO;
import group.app.backend.jsos.dto.JsosUserDTO;
import group.app.backend.jsos.dto.UserMajorDTO;

@FeignClient(value = "jsos-app", url = "localhost:2137")
public interface JsosAppClient {

    @RequestMapping(method = RequestMethod.POST, value = "/auth")
    AuthResponseDTO authenticate(@RequestBody AuthRequestDTO authRequest);

    @RequestMapping(method = RequestMethod.POST, value = "/id")
    JsosUserDTO getUserId(@RequestBody SessionRequestDTO authRequest);

    @RequestMapping(method = RequestMethod.POST, value = "/courseList")
    CourseListDTO getCourseList(@RequestBody SessionRequestDTO authRequest);
    @RequestMapping(method = RequestMethod.POST, value = "/major")
    UserMajorDTO getUserMajor(@RequestBody SessionRequestDTO authRequest);
//TODO: add AdviceController and try catch around jsos request to catch and rethrow error when problem during auth process
}
