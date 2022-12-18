package group.app.backend.task;

import com.fasterxml.jackson.annotation.JsonIgnore;
import group.app.backend.tasklist.TaskList;
import group.app.backend.user.User;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tasks")
@Data
@EqualsAndHashCode(exclude = {"taskList", "owners", "requesters"})
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer taskNumber;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "tasklist_id", referencedColumnName = "id")
    private TaskList taskList;

    @JsonIgnore
    @ManyToMany(mappedBy = "offeredTasks")
    private Set<User> owners = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "requestedTasks")
    private Set<User> requesters = new HashSet<>();


}
