package group.app.backend.tasklist;

import com.fasterxml.jackson.annotation.JsonIgnore;
import group.app.backend.course.Course;
import group.app.backend.task.Task;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tasklists")
@Data
@EqualsAndHashCode(exclude = {"tasks"})
@NoArgsConstructor
public class TaskList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer listNumber;

    @JsonIgnore
    @OneToMany(mappedBy = "taskList")
    private Set<Task> tasks = new HashSet<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "course_id", referencedColumnName = "id")
    private Course course;
}
