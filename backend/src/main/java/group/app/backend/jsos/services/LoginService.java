package group.app.backend.jsos.services;

import java.util.Set;
import java.util.stream.Collectors;

import org.hibernate.PersistentObjectException;
import org.springframework.stereotype.Service;

import group.app.backend.course.Course;
import group.app.backend.course.CourseService;
import group.app.backend.jsos.client.JsosAppClient;
import group.app.backend.jsos.dto.AuthRequestDTO;
import group.app.backend.jsos.dto.AuthResponseDTO;
import group.app.backend.jsos.dto.JsosUserDTO;
import group.app.backend.jsos.dto.LoginDTO;
import group.app.backend.jsos.dto.SessionRequestDTO;
import group.app.backend.user.User;
import group.app.backend.user.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final JsosAppClient jsosAppClient;
    private final UserService userService;
    private final CourseService courseService;

    public LoginDTO login(AuthRequestDTO authRequestDTO) {
        AuthResponseDTO session = jsosAppClient.authenticate(authRequestDTO);
        String jsossessid = session.getJsossessid();
        SessionRequestDTO sessionRequest = SessionRequestDTO.builder().jsossessid(jsossessid).build();
        JsosUserDTO jsosUser = jsosAppClient.getUserId(sessionRequest);
        String userId = jsosUser.getUserId();
        User user;
        if (!userService.exists(userId)) {
            user = saveNewUser(sessionRequest, userId);
        } else {
            user = userService.getUserById(userId);
        }
        return LoginDTO.builder()
                .jsossesid(jsossessid)
                .isOldMan(user.isOldMan())
                .build();
    }

    private User saveNewUser(SessionRequestDTO sessionRequest, String userId) {
        Set<Course> courses = jsosAppClient
                .getCourseList(sessionRequest)
                .getCourseList()
                .stream()
                .map(Course::fromDto)
                .collect(Collectors.toSet());
        saveCourses(courses);
        User user = User.builder()
                .id(userId)
                .courses(courses)
                .build();
        userService.saveUser(user);
        return user;
    }

    private void saveCourses(Set<Course> courses) {
        for (Course course : courses) {
            try {
                courseService.saveCourse(course);
            } catch (PersistentObjectException ignored) {
            }
        }
    }

}
