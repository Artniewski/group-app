package group.app.backend.jsos.services;

import group.app.backend.algorithm.TradeService;
import group.app.backend.jsos.dto.*;
import group.app.backend.jsos.validator.OldManValidator;
import group.app.backend.user.entity.Course;
import group.app.backend.user.entity.Task;
import group.app.backend.user.entity.TaskList;
import group.app.backend.user.entity.User;
import group.app.backend.user.services.TaskListService;
import group.app.backend.user.services.TaskService;
import group.app.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


@Slf4j
@Service
@RequiredArgsConstructor
public class SessionService {
    private final JsosService jsosService;
    private final UserService userService;
    private final TaskListService taskListService;
    private final TaskService taskService;

    private final TradeService tradeService;

    public UserTasksDTO getTasksBySession(String sessionId) {
        String userId = jsosService.getUserId(sessionId);
        Set<Task> offeredTasks = userService.getUserOfferedTasks(userId);
        Set<Task> requestedTasks = userService.getUserRequestedTasks(userId);
        return UserTasksDTO.builder()
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

    public boolean addList(String sessionId, AddTaskListRequestDTO addTaskListRequestDTO) {
        String userId = jsosService.getUserId(sessionId);
        User user = userService.getUserById(userId);
        String courseCode = addTaskListRequestDTO.getCourseCode();

        OldManValidator.validate(user, courseCode);
        TaskList taskList = taskListService.createTaskList(addTaskListRequestDTO.getTaskListNumber(), courseCode);
        log.info("Adding task list: {}", (long) taskList.getTasks().size());
        addTasks(taskList, addTaskListRequestDTO);
        taskListService.saveTaskList(taskList);
        return true;
    }

    private void addTasks(TaskList taskList, AddTaskListRequestDTO addTaskListRequestDTO) {
        Integer taskCount = addTaskListRequestDTO.getTaskCount();
        IntStream.rangeClosed(1, taskCount)
                .mapToObj(num -> taskService.createTask(num, taskList))
                .forEach(taskList::addTask);
        taskListService.saveTaskList(taskList);
    }

    public void makeOldMan(String sessionId) {
        String userId = jsosService.getUserId(sessionId);
        User user = userService.getUserById(userId);
        user.setOldMan(true);
        userService.saveUser(user);
    }

    public Set<StudentDTO> getStudents(String sessionId) {
        String userId = jsosService.getUserId(sessionId);
        User user = userService.getUserById(userId);
        return user.getMajor().getUsers()
                .stream()
                .map(User::toStudentDTO)
                .collect(Collectors.toSet());
    }

    public Set<Task> getAllTasks(String sessionId) {
        String userId = jsosService.getUserId(sessionId);
        User user = userService.getUserById(userId);
        return user.getCourses()
                .stream()
                .map(Course::getTaskLists)
                .flatMap(Collection::stream)
                .map(TaskList::getTasks)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());
    }

    public boolean addOwnedAndNeededTasks(String sessionId, TasksDTO tasksDTO) {
        String userId = jsosService.getUserId(sessionId);
        User user = userService.getUserById(userId);
        Set<TaskDTO> ownedTasks = tasksDTO.getOfferedTasks();
        Set<TaskDTO> requestedTasks = tasksDTO.getRequestedTasks();
        userService.addNewTasksToUser(user, ownedTasks, requestedTasks);
        tradeService.makeTrades();
        return true;
    }

    public User voteForOldman(String sessionId, String voteId) {
        String userId = jsosService.getUserId(sessionId);
        return userService.voteForOldman(userId, voteId);
    }

    public User getOldMan(String sessionId) {
        String userId = jsosService.getUserId(sessionId);
        return userService.getOldMan(userId);
    }
}
