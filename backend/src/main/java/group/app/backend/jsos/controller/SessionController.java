package group.app.backend.jsos.controller;

import group.app.backend.jsos.dto.*;
import group.app.backend.jsos.dto.StudentDTO;
import group.app.backend.jsos.services.LoginService;
import group.app.backend.jsos.services.SessionService;
import group.app.backend.user.entity.Task;
import group.app.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/session")
public class SessionController {

    private final LoginService loginService;
    private final SessionService sessionService;
    private final UserService userService;

    @PostMapping("/login")
    public LoginDTO login(@RequestBody AuthRequestDTO authRequestDTO) {
        return loginService.login(authRequestDTO);
    }

    @GetMapping("/{sessionId}/tasks")
    public UserTasksDTO getTasks(@PathVariable("sessionId") String sessionId) {
        return sessionService.getTasksBySession(sessionId);
    }

    @GetMapping("/{sessionId}/courses")
    public Set<CourseDTO> getCourses(@PathVariable("sessionId") String sessionId) {
        return sessionService.getCoursesBySession(sessionId);
    }

    @PostMapping("/{sessionId}/tasks")
    public boolean addList(@PathVariable("sessionId") String sessionId, @RequestBody AddTaskListRequestDTO addTaskListRequestDTO) {
        return sessionService.addList(sessionId, addTaskListRequestDTO);
    }

    @PostMapping("/{sessionId}/oldman")
    public void makeOldMan(@PathVariable("sessionId") String sessionId) {
        sessionService.makeOldMan(sessionId);
    }

    @GetMapping("/{sessionId}/students")
    public Set<StudentDTO> getStudents(@PathVariable("sessionId") String sessionId) {
        return sessionService.getStudents(sessionId);
    }

    @GetMapping("/{sessionId}/tasks/all")
    public Set<Task> getAllTasks(@PathVariable("sessionId") String sessionId) {
        return sessionService.getAllTasks(sessionId);
    }

    @PostMapping("/{sessionId}/ontasks")
    public boolean addOwnedAndNeededTasks(@PathVariable("sessionId") String sessionId, @RequestBody TasksDTO tasksDTO) {
        return sessionService.addOwnedAndNeededTasks(sessionId, tasksDTO);
    }
}
