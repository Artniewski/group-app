package group.app.backend.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tasklists")
@Data
@Builder
@AllArgsConstructor
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

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "course_id", referencedColumnName = "id")
    private Course course;

    public void addTask(Task task) {
        tasks.add(task);
    }
}
