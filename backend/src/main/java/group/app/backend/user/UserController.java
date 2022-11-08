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
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/{userId}/courses/{courseId}")
    public User addCourseToUser(@PathVariable Long userId, @PathVariable Long courseId) {
        return userService.addCourseToUser(userId, courseId);
    }

    @PutMapping("/{userId}/offeredTasks/{taskId}")
    public User addOfferedTaskToUser(@PathVariable Long userId, @PathVariable Long taskId) {
        return userService.addOfferedTaskToUser(userId, taskId);
    }

    @PutMapping("/{userId}/requestedTasks/{taskId}")
    public User addRequestedTaskToUser(@PathVariable Long userId, @PathVariable Long taskId) {
        return userService.addRequestedTaskToUser(userId, taskId);
    }

}
