package group.app.backend.jsos.validator;

import java.util.stream.Collectors;

import group.app.backend.exceptions.AccessDeniedException;
import group.app.backend.user.entity.Course;
import group.app.backend.user.entity.User;

public class OldManValidator {

    public static void validate(User user, String courseCode) {
        if (!user.isOldMan() || !isValidCourse(user, courseCode)) {
            throw new AccessDeniedException(user.getId());
        }
    }

    private static boolean isValidCourse(User user, String courseCode) {
        return user.getCourses().stream()
                .map(Course::getId)
                .collect(Collectors.toSet())
                .contains(courseCode);
    }
}
