package group.app.backend.jsos.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.app.backend.jsos.client.JsosAppClient;
import group.app.backend.jsos.dto.AuthRequestDTO;
import group.app.backend.jsos.dto.LoginDTO;
import group.app.backend.jsos.services.LoginService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final JsosAppClient jsosAppClient;
    private final LoginService loginService;

    @GetMapping("/test")
    public LoginDTO getCourseById(@RequestBody AuthRequestDTO authRequestDTO) {
        return loginService.login(authRequestDTO);
    }
}
