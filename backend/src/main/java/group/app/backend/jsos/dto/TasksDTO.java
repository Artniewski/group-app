package group.app.backend.jsos.dto;

import static lombok.AccessLevel.PRIVATE;

import java.util.Set;

import group.app.backend.user.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class TasksDTO {
    Set<Task> offeredTasks;
    Set<Task> requestedTasks;
}
