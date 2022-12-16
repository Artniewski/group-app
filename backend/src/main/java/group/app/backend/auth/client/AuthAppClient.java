package group.app.backend.auth.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import group.app.backend.auth.dto.AuthRequestDTO;
import group.app.backend.auth.dto.AuthResponseDTO;

@FeignClient(value = "auth-app", url = "localhost:2137")
public interface AuthAppClient {

    @RequestMapping(method = RequestMethod.POST, value = "/auth")
    AuthResponseDTO authenticate(@RequestBody AuthRequestDTO authRequest);

}
