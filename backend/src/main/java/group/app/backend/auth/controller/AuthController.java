package group.app.backend.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.app.backend.auth.client.AuthAppClient;
import group.app.backend.auth.dto.AuthRequestDTO;
import group.app.backend.auth.dto.AuthResponseDTO;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthAppClient authAppClient;

    @GetMapping("/test")
    public AuthResponseDTO getCourseById(@RequestBody AuthRequestDTO authRequestDTO) {
        return authAppClient.authenticate(authRequestDTO);
    }
}
