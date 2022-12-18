package group.app.backend.user;

import java.util.stream.Collectors;

import group.app.backend.algorithm.models.UserVertex;
import group.app.backend.task.Task;
import lombok.experimental.UtilityClass;

@UtilityClass
public class UserMapper {

    public static UserVertex mapToVertex(User user) {
        return UserVertex.builder()
                .userId(user.getId())
                .ownedTasks(user.getOfferedTasks().stream()
                        .map(Task::getId)
                        .map(String::valueOf)
                        .collect(Collectors.toSet()))
                .wantedTasks(user.getRequestedTasks().stream()
                        .map(Task::getId)
                        .map(String::valueOf)
                        .collect(Collectors.toSet()))
                .build();
    }

}
