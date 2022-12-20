package group.app.backend.user.entity;

import group.app.backend.jsos.dto.StudentDTO;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(exclude = {"courses", "offeredTasks", "requestedTasks", "major"})
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class User {

    @Id
    private String id;
    private String nickname;
    private Double rating;
    private boolean isOldMan = false;
//    TODO: ADD Major class ? or maybe oldman per course

    @ManyToOne(cascade = CascadeType.MERGE)
    private Major major;

    @ManyToMany
    @JoinTable(
            name = "user_courses",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_offered_tasks",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id")
    )
    private Set<Task> offeredTasks = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_requested_tasks",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id")
    )
    private Set<Task> requestedTasks = new HashSet<>();

    public void enrollCourse(Course course) {
        courses.add(course);
    }

    public void addOfferedTask(Task task) {
        offeredTasks.add(task);
    }

    public void addRequestedTask(Task task) {
        requestedTasks.add(task);
    }

    public void removeRequestedTask(Task task) {
        requestedTasks.remove(task);
    }

    public static StudentDTO toStudentDTO(User user) {
        return StudentDTO.builder()
                .userId(user.getId())
                .name(user.getNickname())
                .build();
    }
}
