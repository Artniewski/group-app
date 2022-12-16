//package group.app.backend.matching;
//
//import static group.app.backend.matching.PathsCyclesUtil.getOptimalCycles;
//import static group.app.backend.matching.TradeMatcher.findCyclesAsPaths;
//
//import java.util.List;
//import java.util.Set;
//
//import org.jgrapht.GraphPath;
//import org.junit.jupiter.api.Test;
//
//public class TradeMatcherTest {
//
//    @Test
//    public void shouldFindPair() {
//        UserVertex user1 = UserVertex.builder()
//                .userId("A")
//                .ownedTasks(Set.of("1"))
//                .wantedTasks(Set.of("2"))
//                .build();
//
//        UserVertex user2 = UserVertex.builder()
//                .userId("B")
//                .ownedTasks(Set.of("2", "3"))
//                .wantedTasks(Set.of("1"))
//                .build();
//
//        UserVertex user3 = UserVertex.builder()
//                .userId("C")
//                .ownedTasks(Set.of("1"))
//                .wantedTasks(Set.of("3"))
//                .build();
//        var paths = findCyclesAsPaths(List.of(user1, user2, user3));
//        paths.forEach(System.out::println);
//        System.out.println("#########");
//        Set<GraphPath<String, TradeEdge>> optimalCycles = getOptimalCycles(Set.of(), paths);
//        System.out.println("Optimal cycles: " + optimalCycles);
//        optimalCycles.forEach(System.out::println);
//    }
//
//    @Test
//    public void shouldFindTriple() {
//        UserVertex user1 = UserVertex.builder()
//                .userId("A")
//                .ownedTasks(Set.of("1", "8"))
//                .wantedTasks(Set.of("2", "3", "5", "9"))
//                .build();
//
//        UserVertex user2 = UserVertex.builder()
//                .userId("B")
//                .ownedTasks(Set.of("2", "3", "4"))
//                .wantedTasks(Set.of("1", "8"))
//                .build();
//
//        UserVertex user3 = UserVertex.builder()
//                .userId("C")
//                .ownedTasks(Set.of("5", "6"))
//                .wantedTasks(Set.of("4", "7"))
//                .build();
//        UserVertex user4 = UserVertex.builder()
//                .userId("D")
//                .ownedTasks(Set.of("7", "9"))
//                .wantedTasks(Set.of("4", "6"))
//                .build();
//
//        var paths = findCyclesAsPaths(List.of(user1, user2, user3, user4));
//        paths.forEach(System.out::println);
//        System.out.println("#########");
//        Set<GraphPath<String, TradeEdge>> optimalCycles = getOptimalCycles(Set.of(), paths);
//        System.out.println("Optimal cycles: " + optimalCycles);
//        optimalCycles.forEach(System.out::println);
//    }
//
//}