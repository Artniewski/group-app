package group.app.backend.jsos.client;

import group.app.backend.jsos.dto.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(value = "jsos-app", url = "localhost:2137")
public interface JsosAppClient {

    @PostMapping(value = "/auth")
    AuthResponseDTO authenticate(@RequestBody AuthRequestDTO authRequest);

    @PostMapping(value = "/id")
    JsosUserDTO getUserId(@RequestBody SessionRequestDTO authRequest);

    @PostMapping(value = "/courseList")
    CourseListDTO getCourseList(@RequestBody SessionRequestDTO authRequest);

    @PostMapping(value = "/major")
    UserMajorDTO getUserMajor(@RequestBody SessionRequestDTO authRequest);
//TODO: add AdviceController and try catch around jsos request to catch and rethrow error when problem during auth process
}
