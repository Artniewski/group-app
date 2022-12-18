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

    public void removeRequestedTasksFromUser(Long userId, List<Long> taskIds){
        User user = getUserById(userId);
        taskIds.forEach(task -> user.removeRequestedTask(taskService.getTaskById(task)));
        userRepository.save(user);
    }

    public void removeRequestedTaskFromUser(Long userId, Long taskId){
        User user = getUserById(userId);
        user.removeRequestedTask(taskService.getTaskById(taskId));
        userRepository.save(user);
    }
}
