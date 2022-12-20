package group.app.backend.user.services;

import group.app.backend.exceptions.ResourceNotFoundException;
import group.app.backend.jsos.dto.TaskDTO;
import group.app.backend.user.entity.Course;
import group.app.backend.user.entity.Task;
import group.app.backend.user.entity.User;
import group.app.backend.user.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    public Set<Task> getUserRequestedTasks(String userId) {
        User user = getUserById(userId);
        return user.getRequestedTasks();
    }

    public Set<Task> getUserOfferedTasks(String userId) {
        User user = getUserById(userId);
        return user.getOfferedTasks();
    }

    public Set<Course> getUserCourses(String userId) {
        User user = getUserById(userId);
        return user.getCourses();
    }

    public void removeRequestedTaskFromUser(String userId, Long taskId) {
        User user = getUserById(userId);
        user.removeRequestedTask(taskService.getTaskById(taskId));
        userRepository.save(user);
    }

    public boolean exists(String userId) {
        return userRepository.existsById(userId);
    }

    public User getOldMan(String userId) {
        return userRepository.findAll().stream()
                .filter(user -> user.getMajor().equals(getUserById(userId).getMajor()))
                .filter(User::isOldMan).toList().get(0);
    }

    public User voteForOldman(String userId, String voteId) {

        List<User> currOldmen = userRepository.findAll().stream()
                .filter(user -> user.getMajor().equals(getUserById(userId).getMajor()))
                .filter(User::isOldMan).toList();

        User currOldman;
        if (!currOldmen.isEmpty()) {
            currOldman = currOldmen.get(0);
        } else {
            currOldman = null;
        }

        Optional<User> votedForOpt = userRepository.findById(voteId);

        if (votedForOpt.isEmpty()) {
            throw new NullPointerException("Voted user not found");
        }

        User votedFor = votedForOpt.get();

        if (!votedFor.getMajor().equals(getUserById(userId).getMajor())) {
            throw new IllegalArgumentException("Vote for someone from your major!");
        }

        votedFor.setVotes(votedFor.getVotes() + 1);

        if (currOldman != null) {
            if (votedFor.getVotes() > currOldman.getVotes()) {
                userRepository.findAll().forEach(user -> makeYoungMan(user.getId()));
                makeOldMan(votedFor.getId());
            }

            userRepository.save(currOldman);
        } else {
            makeOldMan(votedFor.getId());
        }
        userRepository.save(votedFor);


        return getUserById(voteId);
    }

    public void makeOldMan(String userId) {
        User user = getUserById(userId);
        user.setOldMan(true);
        userRepository.save(user);
    }

    public void makeYoungMan(String userId) {
        User user = getUserById(userId);
        user.setOldMan(false);
        userRepository.save(user);
    }

    public void addNewTasksToUser(User user, Set<TaskDTO> ownedTasks, Set<TaskDTO> requestedTasks) {
        for (TaskDTO task : ownedTasks) {
            int taskNumber = task.getTaskNumber();
            int taskListNumber = task.getTaskListNumber();
            String courseId = task.getCourse().getCourseCode();
            Course course = courseService.getCourseById(courseId);

            Task taskByNumber = course.getTaskListByNumber(taskListNumber).getTaskByNumber(taskNumber);
            user.addOfferedTask(taskByNumber);
        }

        for (TaskDTO task : requestedTasks) {
            int taskNumber = task.getTaskNumber();
            int taskListNumber = task.getTaskListNumber();
            String courseId = task.getCourse().getCourseCode();
            Course course = courseService.getCourseById(courseId);

            Task taskByNumber = course.getTaskListByNumber(taskListNumber).getTaskByNumber(taskNumber);
            user.addRequestedTask(taskByNumber);
        }

        saveUser(user);
    }
}
