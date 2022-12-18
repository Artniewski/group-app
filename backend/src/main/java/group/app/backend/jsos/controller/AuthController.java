package group.app.backend.jsos.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.app.backend.jsos.client.JsosAppClient;
import group.app.backend.jsos.dto.AuthRequestDTO;
import group.app.backend.jsos.dto.AuthResponseDTO;
import group.app.backend.jsos.dto.CourseListDTO;
import group.app.backend.jsos.dto.SessionRequestDTO;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final JsosAppClient jsosAppClient;

    @GetMapping("/test")
    public CourseListDTO getCourseById(@RequestBody AuthRequestDTO authRequestDTO) {
        AuthResponseDTO response = jsosAppClient.authenticate(authRequestDTO);
//        return jsosAppClient.getUserId(SessionRequestDTO.builder().jsossessid(response.getJsossessid()).build());
        return jsosAppClient.getCourseList(SessionRequestDTO.builder().jsossessid(response.getJsossessid()).build());
    }
}
