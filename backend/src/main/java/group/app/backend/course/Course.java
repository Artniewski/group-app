package group.app.backend.course;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import group.app.backend.jsos.dto.CourseDTO;
import group.app.backend.tasklist.TaskList;
import group.app.backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "courses")
@Data
@EqualsAndHashCode(exclude = {"taskLists", "enrolledUsers"})
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    private String id;

    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "courses")
    private Set<User> enrolledUsers = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "course")
    private Set<TaskList> taskLists = new HashSet<>();

    public static Course fromDto(CourseDTO dto) {
        return Course.builder()
                .id(dto.getCourseCode())
                .name(dto.getCourseName())
                .build();
    }

    public CourseDTO toDto() {
        return CourseDTO.builder()
                .courseCode(id)
                .courseName(name)
                .build();
    }
}
