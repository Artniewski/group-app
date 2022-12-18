package group.app.backend.user;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/{userId}/courses/{courseId}")
    public User addCourseToUser(@PathVariable String userId, @PathVariable String courseId) {
        return userService.addCourseToUser(userId, courseId);
    }

    @PutMapping("/{userId}/offeredTasks/{taskId}")
    public User addOfferedTaskToUser(@PathVariable String userId, @PathVariable Long taskId) {
        return userService.addOfferedTaskToUser(userId, taskId);
    }

    @PutMapping("/{userId}/requestedTasks/{taskId}")
    public User addRequestedTaskToUser(@PathVariable String userId, @PathVariable Long taskId) {
        return userService.addRequestedTaskToUser(userId, taskId);
    }

}
