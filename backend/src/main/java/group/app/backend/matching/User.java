package group.app.backend.matching;

import java.util.HashSet;
import java.util.Set;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Builder
@EqualsAndHashCode(exclude = {"ownedTasks","wantedTasks"})
public class User {

    String userId;
    Set<String> ownedTasks = new HashSet<>();
    Set<String> wantedTasks = new HashSet<>();

}
