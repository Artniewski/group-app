package group.app.backend.jsos.dto;

import group.app.backend.user.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.jackson.Jacksonized;

import java.util.Set;

import static lombok.AccessLevel.PRIVATE;

@Data
@Builder
@Jacksonized
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class TasksDTO {
    Set<Task> offeredTasks;
    Set<Task> requestedTasks;
}
