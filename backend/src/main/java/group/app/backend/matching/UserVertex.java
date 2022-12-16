package group.app.backend.matching;

import java.util.HashSet;
import java.util.Set;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@EqualsAndHashCode(exclude = {"ownedTasks","wantedTasks"})
public class UserVertex {

    String userId;
    Set<String> ownedTasks = new HashSet<>();
    Set<String> wantedTasks = new HashSet<>();

}
