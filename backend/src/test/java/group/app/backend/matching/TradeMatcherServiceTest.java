package group.app.backend.matching;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import java.util.List;
import java.util.Set;

import org.jgrapht.graph.Multigraph;
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
                .ownedTasks(Set.of("1"))
                .wantedTasks(Set.of("2"))
                .build();

        User user2 = User.builder()
                .userId("user2")
                .ownedTasks(Set.of("2"))
                .wantedTasks(Set.of("1"))
                .build();

        Multigraph<String, TradeEdge> expectedGraph = new Multigraph<>(TradeEdge.class);
        expectedGraph.addVertex("user1");
        expectedGraph.addVertex("user2");
        expectedGraph.addEdge("user1", "user2", new TradeEdge("1"));
        expectedGraph.addEdge("user2", "user1", new TradeEdge("2"));

        var edges = service.find(List.of(user1, user2));
        assertThat(edges.toString()).isEqualTo(expectedGraph.edgeSet().toString());
    }

    @Test
    public void shouldFindTriple() {
        User user1 = User.builder()
                .userId("user1")
                .ownedTasks(Set.of("1"))
                .wantedTasks(Set.of("2"))
                .build();

        User user2 = User.builder()
                .userId("user2")
                .ownedTasks(Set.of("2","3"))
                .wantedTasks(Set.of("1"))
                .build();

        User user3 = User.builder()
                .userId("user3")
                .ownedTasks(Set.of("2","3"))
                .wantedTasks(Set.of("1"))
                .build();

        User user4 = User.builder()
                .userId("user4")
                .ownedTasks(Set.of("1"))
                .wantedTasks(Set.of("3"))
                .build();

        var edges = service.find(List.of(user1, user2, user3, user4));
        System.out.println(edges.toString());
    }

}