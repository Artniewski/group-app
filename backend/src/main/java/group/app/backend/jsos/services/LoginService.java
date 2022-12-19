package group.app.backend.jsos.services;

import java.util.Set;

import group.app.backend.user.entity.Major;
import group.app.backend.user.services.MajorService;
import org.hibernate.PersistentObjectException;
import org.springframework.stereotype.Service;

import group.app.backend.user.entity.Course;
import group.app.backend.user.services.CourseService;
import group.app.backend.jsos.dto.AuthRequestDTO;
import group.app.backend.jsos.dto.LoginDTO;
import group.app.backend.user.entity.User;
import group.app.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final JsosService jsosService;
    private final UserService userService;
    private final CourseService courseService;
    private final MajorService majorService;

    public LoginDTO login(AuthRequestDTO authRequestDTO) {
        String jsosSessionId = jsosService.authenticate(authRequestDTO);
        String userId = jsosService.getUserId(jsosSessionId);

        User user;
        if (!userService.exists(userId)) {
            user = saveNewUser(jsosSessionId, userId);
        } else {
            user = userService.getUserById(userId);
        }
        return LoginDTO.builder()
                .jsossessid(jsosSessionId)
                .isOldMan(user.isOldMan())
                .build();
    }

    private User saveNewUser(String jsosSessionId, String userId) {
        Major major = jsosService.getMajor(jsosSessionId);
        saveMajor(major);
        Set<Course> courses = jsosService.getCourseList(jsosSessionId);
        saveCourses(courses);
        User user = User.builder()
                .id(userId)
                .courses(courses)
                .major(major)
                .build();
        userService.saveUser(user);
        return user;
    }

    private void saveMajor(Major major) {
        try {
            majorService.saveMajor(major);
        } catch (Exception e) {
            // ignore
        }
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
