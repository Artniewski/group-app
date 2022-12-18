package group.app.backend.jsos.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import group.app.backend.jsos.dto.AuthRequestDTO;
import group.app.backend.jsos.dto.AuthResponseDTO;
import group.app.backend.jsos.dto.UserIdRequestDTO;
import group.app.backend.jsos.dto.UserIdResponseDTO;

@FeignClient(value = "jsos-app", url = "localhost:2137")
public interface JsosAppClient {

    @RequestMapping(method = RequestMethod.POST, value = "/auth")
    AuthResponseDTO authenticate(@RequestBody AuthRequestDTO authRequest);

    @RequestMapping(method = RequestMethod.POST, value = "/id")
    UserIdResponseDTO getUserId(@RequestBody UserIdRequestDTO authRequest);

}
