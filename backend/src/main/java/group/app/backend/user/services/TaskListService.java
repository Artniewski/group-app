package group.app.backend.user.services;

import group.app.backend.exceptions.ResourceNotFoundException;
import group.app.backend.user.entity.TaskList;
import group.app.backend.user.repos.TaskListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskListService {

    private final TaskListRepository taskListRepository;
    private final CourseService courseService;

    public TaskList getTaskListById(Long id) {
        return taskListRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public List<TaskList> getAllTaskLists() {
        return taskListRepository.findAll();
    }

    public TaskList createTaskList(TaskList taskList) {
        return taskListRepository.save(taskList);
    }

    public void deleteTaskList(Long id) {
        taskListRepository.deleteById(id);
    }

    public TaskList addCourseToTaskList(Long taskListId, String courseId) {
        TaskList taskList = getTaskListById(taskListId);
        taskList.setCourse(courseService.getCourseById(courseId));
        return taskListRepository.save(taskList);
    }
}
