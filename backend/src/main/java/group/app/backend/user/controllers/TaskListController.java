package group.app.backend.user.controllers;


import group.app.backend.user.services.TaskListService;
import group.app.backend.user.entity.TaskList;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tasklists")
public class TaskListController {

    private final TaskListService taskListService;

    @GetMapping("/{id}")
    public TaskList getTaskListById(@PathVariable Long id) {
        return taskListService.getTaskListById(id);
    }

    @PostMapping
    public TaskList createTaskList(@RequestBody TaskList taskList) {
        return taskListService.createTaskList(taskList);
    }

    @DeleteMapping("/{id}")
    public void deleteTaskList(@PathVariable Long id) {
        taskListService.deleteTaskList(id);
    }

    @GetMapping("/all")
    public List<TaskList> getAllTaskLists() {
        return taskListService.getAllTaskLists();
    }

    @PutMapping("/{taskListId}/course/{courseId}")
    public TaskList addCourseToTaskList(@PathVariable Long taskListId, @PathVariable String courseId) {
        return taskListService.addCourseToTaskList(taskListId, courseId);
    }


}
