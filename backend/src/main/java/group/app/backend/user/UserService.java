package group.app.backend.user;

import group.app.backend.course.CourseService;
import group.app.backend.exceptions.ResourceNotFoundException;
import group.app.backend.task.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CourseService courseService;
    private final TaskService taskService;

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User addCourseToUser(Long userId, Long courseId) {
        User user = getUserById(userId);
        user.enrollCourse(courseService.getCourseById(courseId));
        return userRepository.save(user);
    }

    public User addOfferedTaskToUser(Long userId, Long taskId) {
        User user = getUserById(userId);
        user.addOfferedTask(taskService.getTaskById(taskId));
        return userRepository.save(user);
    }

    public User addRequestedTaskToUser(Long userId, Long taskId) {
        User user = getUserById(userId);
        user.addRequestedTask(taskService.getTaskById(taskId));
        return userRepository.save(user);
    }
}
