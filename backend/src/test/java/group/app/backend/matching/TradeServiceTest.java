package group.app.backend.matching;

import group.app.backend.BackendApplication;
import group.app.backend.task.Task;
import group.app.backend.user.User;
import group.app.backend.user.UserService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Set;

import static group.app.backend.matching.TradeMatcher.findOptimalCycles;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = BackendApplication.class)
@RunWith(SpringRunner.class)
class TradeServiceTest {
    @Autowired
    private UserService userService;
    @Autowired
    private TradeService tradeService;
    @Test
    public void optimalCyclesTest() {
        userService.createUser(User.builder()
                .id(1L).offeredTasks(Set.of(Task.builder().id(1L).build()))
                        .requestedTasks(Set.of(Task.builder().id(2L).build()))
                .build()
                );
        userService.createUser(User.builder()
                .id(2L).offeredTasks(Set.of(Task.builder().id(2L).build(),Task.builder().id(3L).build()))
                .requestedTasks(Set.of(Task.builder().id(1L).build()))
                .build()
        );
        userService.createUser(User.builder()
                .id(3L).offeredTasks(Set.of(Task.builder().id(1L).build()))
                .requestedTasks(Set.of(Task.builder().id(3L).build(), Task.builder().id(4L).build()))
                .build()
        );
        var optimalCycles = tradeService.makeTrades();
        System.out.println("Optimal cycles round 1:" + optimalCycles);
        optimalCycles.forEach(System.out::println);

        userService.createUser(User.builder()
                .id(4L).offeredTasks(Set.of(Task.builder().id(4L).build()))
                .requestedTasks(Set.of(Task.builder().id(1L).build()))
                .build()
        );

        optimalCycles = tradeService.makeTrades();
        System.out.println("Optimal cycles round 2:" + optimalCycles);
        optimalCycles.forEach(System.out::println);
    }
}