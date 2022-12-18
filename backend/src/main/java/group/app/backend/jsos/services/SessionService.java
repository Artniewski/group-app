package group.app.backend.jsos.services;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import group.app.backend.user.entity.Course;
import group.app.backend.jsos.dto.CourseDTO;
import group.app.backend.jsos.dto.TasksDTO;
import group.app.backend.user.entity.Task;
import group.app.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SessionService {
    private final JsosService jsosService;
    private final UserService userService;

    public TasksDTO getTasksBySession(String sessionId) {
        String userId = jsosService.getUserId(sessionId);
        Set<Task> offeredTasks = userService.getUserOfferedTasks(userId);
        Set<Task> requestedTasks = userService.getUserRequestedTasks(userId);
        return TasksDTO.builder()
                .offeredTasks(offeredTasks)
                .requestedTasks(requestedTasks)
                .build();
        //        TODO: TaskDTO instead of Task?
    }

    public Set<CourseDTO> getCoursesBySession(String sessionId) {
        String userId = jsosService.getUserId(sessionId);
        return userService.getUserCourses(userId)
                .stream()
                .map(Course::toDto)
                .collect(Collectors.toSet());
    }

}
