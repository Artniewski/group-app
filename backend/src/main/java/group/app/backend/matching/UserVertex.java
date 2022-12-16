package group.app.backend.matching;

import java.util.HashSet;
import java.util.Set;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(exclude = {"ownedTasks","wantedTasks"})
public class UserVertex {

    String userId;
    Set<String> ownedTasks;
    Set<String> wantedTasks;
    
}
