package group.app.backend.jsos.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.app.backend.jsos.client.JsosAppClient;
import group.app.backend.jsos.dto.AuthRequestDTO;
import group.app.backend.jsos.dto.AuthResponseDTO;
import group.app.backend.jsos.dto.UserIdRequestDTO;
import group.app.backend.jsos.dto.UserIdResponseDTO;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final JsosAppClient jsosAppClient;

    @GetMapping("/test")
    public UserIdResponseDTO getCourseById(@RequestBody AuthRequestDTO authRequestDTO) {
        AuthResponseDTO response = jsosAppClient.authenticate(authRequestDTO);
        return jsosAppClient.getUserId(UserIdRequestDTO.builder().jsossessid(response.getJsossessid()).build());
    }
}
