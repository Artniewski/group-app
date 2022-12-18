package group.app.backend.jsos.services;

import org.springframework.stereotype.Service;

import group.app.backend.jsos.client.JsosAppClient;
import group.app.backend.jsos.dto.AuthRequestDTO;
import group.app.backend.jsos.dto.AuthResponseDTO;
import group.app.backend.jsos.dto.LoginDTO;
import group.app.backend.jsos.dto.SessionRequestDTO;
import group.app.backend.jsos.dto.JsosUserDTO;
import group.app.backend.user.User;
import group.app.backend.user.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final JsosAppClient jsosAppClient;
    private final UserService userService;

    public LoginDTO login(AuthRequestDTO authRequestDTO) {
        AuthResponseDTO session = jsosAppClient.authenticate(authRequestDTO);
        String jsossessid = session.getJsossessid();
        JsosUserDTO jsosUser = jsosAppClient.getUserId(SessionRequestDTO.builder().jsossessid(jsossessid).build());
        String userId = jsosUser.getUserId();
        User user;
        if (!userService.exists(userId)) {

//            userService.saveUser();
        } else {
            user = userService.getUserById(userId);
        }

        return LoginDTO.builder()
                .jsossesid(jsossessid)
//                .isOldMan(user.isOldMan())
                .build();
    }

}
