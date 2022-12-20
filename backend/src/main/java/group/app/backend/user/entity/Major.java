package group.app.backend.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import group.app.backend.jsos.dto.UserMajorDTO;
import group.app.backend.user.entity.ids.MajorID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@IdClass(MajorID.class)
@Table(name = "majors")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Major {

    @Id
    private String semester;
    @Id
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "major")
    private Set<User> users = new HashSet<>();

    @JsonIgnore
    public static Major fromDto(UserMajorDTO dto) {
        return Major.builder()
                .name(dto.getMajor())
                .semester(dto.getSemester())
                .build();
    }
}

