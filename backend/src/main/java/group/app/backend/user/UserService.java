package group.app.backend.user;

import java.util.List;

import org.springframework.stereotype.Service;

import group.app.backend.course.CourseService;
import group.app.backend.exceptions.ResourceNotFoundException;
import group.app.backend.task.TaskService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CourseService courseService;
    private final TaskService taskService;

    public User getUserById(String id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public User addCourseToUser(String userId, String courseId) {
        User user = getUserById(userId);
        user.enrollCourse(courseService.getCourseById(courseId));
        return userRepository.save(user);
    }

    public User addOfferedTaskToUser(String userId, Long taskId) {
        User user = getUserById(userId);
        user.addOfferedTask(taskService.getTaskById(taskId));
        return userRepository.save(user);
    }

    public User addRequestedTaskToUser(String userId, Long taskId) {
        User user = getUserById(userId);
        user.addRequestedTask(taskService.getTaskById(taskId));
        return userRepository.save(user);
    }

    public void removeRequestedTaskFromUser(String userId, Long taskId) {
        User user = getUserById(userId);
        user.removeRequestedTask(taskService.getTaskById(taskId));
        userRepository.save(user);
    }

    public boolean exists(String userId) {
        return userRepository.existsById(userId);
    }
}
