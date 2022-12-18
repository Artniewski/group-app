package group.app.backend.course;

import com.fasterxml.jackson.annotation.JsonIgnore;
import group.app.backend.tasklist.TaskList;
import group.app.backend.user.User;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "courses")
@Data
@EqualsAndHashCode(exclude = {"taskLists", "enrolledUsers"})
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String code;

    @JsonIgnore
    @ManyToMany(mappedBy = "courses")
    private Set<User> enrolledUsers = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "course")
    private Set<TaskList> taskLists = new HashSet<>();

}
