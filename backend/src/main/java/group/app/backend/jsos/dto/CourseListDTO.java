package group.app.backend.jsos.dto;

import static lombok.AccessLevel.PRIVATE;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.jackson.Jacksonized;

@Data
@Builder
@Jacksonized
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class CourseListDTO {
    @JsonProperty("idSluchacza")
    String userId;
    List<CourseDTO> courseList;
}
