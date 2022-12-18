package group.app.backend.jsos.services;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import group.app.backend.user.entity.Course;
import group.app.backend.jsos.client.JsosAppClient;
import group.app.backend.jsos.dto.AuthRequestDTO;
import group.app.backend.jsos.dto.SessionRequestDTO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JsosService {

    private final JsosAppClient jsosAppClient;

    public String authenticate(AuthRequestDTO authRequestDTO) {
        return jsosAppClient.authenticate(authRequestDTO).getJsossessid();
    }

    public String getUserId(String jsosSessionId) {
        SessionRequestDTO sessionRequest = buildSessionRequest(jsosSessionId);
        return jsosAppClient.getUserId(sessionRequest).getUserId();
    }

    public Set<Course> getCourseList(String jsosSessionId) {
        SessionRequestDTO sessionRequest = buildSessionRequest(jsosSessionId);
        return jsosAppClient
                .getCourseList(sessionRequest)
                .getCourseList()
                .stream()
                .map(Course::fromDto)
                .collect(Collectors.toSet());
    }

    private static SessionRequestDTO buildSessionRequest(String jsosSessionId) {
        return SessionRequestDTO.builder().jsossessid(jsosSessionId).build();
    }
}
