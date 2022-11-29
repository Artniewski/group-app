package group.app.backend.matching;

import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TradeMatcherServiceTest {

    @Autowired
    TradeMatcherService service;

    @Test
    public void shouldFindPair() {
        User user1 = User.builder()
                .userId("user1")
                .ownedTasks(Set.of("1","3"))
                .wantedTasks(Set.of("2"))
                .build();

        User user2 = User.builder()
                .userId("user2")
                .ownedTasks(Set.of("2"))
                .wantedTasks(Set.of("1","3"))
                .build();

        var cycles = service.findCyclesAsPaths(List.of(user1, user2));
        cycles.forEach(System.out::println);
    }

    @Test
    public void shouldFindTriple() {
        User user1 = User.builder()
                .userId("A")
                .ownedTasks(Set.of("1"))
                .wantedTasks(Set.of("2","3","5"))
                .build();

        User user2 = User.builder()
                .userId("B")
                .ownedTasks(Set.of("2", "3","4"))
                .wantedTasks(Set.of("1"))
                .build();

        User user3 = User.builder()
                .userId("C")
                .ownedTasks(Set.of("5","6"))
                .wantedTasks(Set.of("4","7"))
                .build();
        User user4 = User.builder()
                .userId("D")
                .ownedTasks(Set.of("7"))
                .wantedTasks(Set.of("4","6"))
                .build();


        var cycles = service.findCyclesAsPaths(List.of(user1, user2, user3,user4));
        cycles.forEach(System.out::println);
    }

}