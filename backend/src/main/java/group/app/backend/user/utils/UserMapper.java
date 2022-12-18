package group.app.backend.user.utils;

import java.util.stream.Collectors;

import group.app.backend.algorithm.models.UserVertex;
import group.app.backend.user.entity.Task;
import group.app.backend.user.entity.User;
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
