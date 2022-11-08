package group.app.backend.task;

import group.app.backend.exceptions.ResourceNotFoundException;
import group.app.backend.tasklist.TaskListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskListService taskListService;

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Task updateTaskList(Long taskId, Long tasklistId) {
        Task task = getTaskById(taskId);
        task.setTaskList(taskListService.getTaskListById(tasklistId));
        return taskRepository.save(task);
    }
}
