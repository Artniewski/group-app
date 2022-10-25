package group.app.backend.controller;

import group.app.backend.auth.AuthService;
import group.app.backend.auth.JsosAuthProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AppController {

    private final AuthService authService;

    @GetMapping("/auth")
    public JsosAuthProperties getJsosAuth() {
        return authService.getJsosAuthProperties();
    }

}
