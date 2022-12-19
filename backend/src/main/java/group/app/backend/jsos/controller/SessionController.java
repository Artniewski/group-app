package group.app.backend.jsos.controller;

import java.util.Set;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.app.backend.jsos.dto.AddTaskListRequestDTO;
import group.app.backend.jsos.dto.AuthRequestDTO;
import group.app.backend.jsos.dto.CourseDTO;
import group.app.backend.jsos.dto.LoginDTO;
import group.app.backend.jsos.dto.TasksDTO;
import group.app.backend.jsos.services.LoginService;
import group.app.backend.jsos.services.SessionService;
import group.app.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;

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
    public TasksDTO getTasks(@PathVariable String sessionId) {
        return sessionService.getTasksBySession(sessionId);
    }

    @GetMapping("/{sessionId}/courses")
    public Set<CourseDTO> getCourses(@PathVariable String sessionId) {
        return sessionService.getCoursesBySession(sessionId);
    }

    @PostMapping("/{sessionId}/tasks")
    public boolean addList(@PathVariable String sessionId, @RequestBody AddTaskListRequestDTO addTaskListRequestDTO) {
        return sessionService.addList(sessionId, addTaskListRequestDTO);
    }

    @PostMapping("/{sessionId}/oldman")
    public void makeOldMan(@PathVariable String sessionId) {
        userService.makeOldMan(sessionId);
    }

}
