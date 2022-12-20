package group.app.backend.algorithm;

import group.app.backend.BackendApplication;
import group.app.backend.algorithm.models.TradeEdge;
import group.app.backend.algorithm.models.UserVertex;
import org.jgrapht.GraphPath;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static group.app.backend.algorithm.TradeService.getFinalEdges;
import static group.app.backend.algorithm.utils.TradeMatcher.findOptimalCycles;


@SpringBootTest(classes = BackendApplication.class)
@RunWith(SpringRunner.class)
class TradeServiceTest {

    @Test
    public void optimalCyclesTest() {


        List<UserVertex> userVertices = IntStream.rangeClosed(1, 200)
                .mapToObj(i ->
                        UserVertex.builder()
                                .userId(String.valueOf(i))
                                .wantedTasks(new HashSet<>())
                                .ownedTasks(new HashSet<>())
                                .build())
                .toList();

        List<String> taskIds = new ArrayList<>(IntStream.rangeClosed(1, 2000)
                .mapToObj(String::valueOf)
                .toList());

        AtomicInteger edgeCounter = new AtomicInteger();

        for (UserVertex userVertex : userVertices) {
            Collections.shuffle(taskIds);
            Set<String> ownedTask = taskIds.stream()
                    .limit(10)
                    .collect(Collectors.toSet());
            userVertex.getOwnedTasks().addAll(ownedTask);
            Collections.shuffle(taskIds);
            Set<String> filteredTaskIds = taskIds.stream()
                    .filter(taskId -> !userVertex.getOwnedTasks().contains(taskId))
                    .limit(10)
                    .collect(Collectors.toSet());
            userVertex.getWantedTasks().addAll(filteredTaskIds);
            Set<GraphPath<String, TradeEdge>> graphPaths = findOptimalCycles(userVertices);
            getFinalEdges(graphPaths)
                    .forEach(tradeEdge -> {
                        edgeCounter.getAndIncrement();
                        System.out.println(userVertex.getUserId() + " Removed edge: " + tradeEdge);
                        String target = (String) tradeEdge.getTarget();
                        String taskId = tradeEdge.getTaskId();
                        UserVertex targetVertex = userVertices.stream()
                                .filter(userVertex1 -> userVertex1.getUserId().equals(target))
                                .findFirst()
                                .orElseThrow();
                        targetVertex.getWantedTasks().remove(taskId);
                    });
        }
        System.out.println("Total edges: " + edgeCounter.get());
    }
}