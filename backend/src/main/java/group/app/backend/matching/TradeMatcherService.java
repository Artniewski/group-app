package group.app.backend.matching;

import static org.jgrapht.alg.cycle.Cycles.simpleCycleToGraphPath;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.jgrapht.Graph;
import org.jgrapht.GraphPath;
import org.jgrapht.alg.cycle.SzwarcfiterLauerSimpleCycles;
import org.jgrapht.alg.shortestpath.AllDirectedPaths;
import org.jgrapht.graph.DirectedMultigraph;
import org.springframework.stereotype.Service;

@Service
public class TradeMatcherService {

    public Set<GraphPath<String, TradeEdge>> findCyclesAsPaths(List<User> users) {
        DirectedMultigraph<String, TradeEdge> graph = buildGraph(users);
        List<List<String>> cycles = getSimpleCycles(graph);
        return mapCyclesToPaths(graph, cycles);
    }

    private static Set<GraphPath<String, TradeEdge>> mapCyclesToPaths(DirectedMultigraph<String, TradeEdge> graph, List<List<String>> cycles) {
        AllDirectedPaths<String, TradeEdge> allDirectedPaths = new AllDirectedPaths<>(graph);
        return cycles.stream()
                .filter(cycle -> !cycle.isEmpty())
                .map(cycle -> {
                    String firstVertex = cycle.get(0);
                    String lastVertex = cycle.get(cycle.size() - 1);
                    List<GraphPath<String, TradeEdge>> paths = allDirectedPaths.getAllPaths(firstVertex, lastVertex, true, 100);
                    Set<TradeEdge> connectingEdges = graph.getAllEdges(lastVertex, firstVertex);
                    return paths.stream()
                            .map(path -> connectingEdges.stream()
                                    .map(edge -> addEdgeToPath(graph, path, edge))
                                    .collect(Collectors.toSet()))
                            .flatMap(Collection::stream)
                            .collect(Collectors.toSet());
                })
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());
    }

    private static GraphPath<String, TradeEdge> addEdgeToPath(DirectedMultigraph<String, TradeEdge> graph, GraphPath<String, TradeEdge> path, TradeEdge edge) {
        List<TradeEdge> tradeEdges = new ArrayList<>(path.getEdgeList());
        tradeEdges.add(edge);
        return simpleCycleToGraphPath(graph, tradeEdges);
    }

    private static List<List<String>> getSimpleCycles(DirectedMultigraph<String, TradeEdge> graph) {
        return new SzwarcfiterLauerSimpleCycles<>(graph).findSimpleCycles();
    }

    private static DirectedMultigraph<String, TradeEdge> buildGraph(List<User> users) {
        DirectedMultigraph<String, TradeEdge> graph = new DirectedMultigraph<>(TradeEdge.class);
        addUserVertices(users, graph);
        addEdges(graph, users, getAvailableTasks(users));
        return graph;
    }

    private static void addEdges(DirectedMultigraph<String, TradeEdge> graph, List<User> users, Set<String> availableTasks) {
        availableTasks.forEach(task -> {
            Set<String> requesters = new HashSet<>();
            Set<String> owners = new HashSet<>();
            users.forEach(user -> {
                if (user.getOwnedTasks().contains(task)) {
                    owners.add(user.getUserId());
                }
                if (user.getWantedTasks().contains(task)) {
                    requesters.add(user.getUserId());
                }
            });
            owners.forEach(owner -> requesters.forEach(requester -> graph.addEdge(owner, requester, new TradeEdge(task))));
        });
    }

    private static Set<String> getAvailableTasks(List<User> users) {
        Set<String> allOwnedTasks = users.stream()
                .map(User::getOwnedTasks)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());

        Set<String> allWantedTasks = users.stream()
                .map(User::getWantedTasks)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());

        return allWantedTasks.stream()
                .filter(allOwnedTasks::contains)
                .collect(Collectors.toSet());
    }

    private static void addUserVertices(List<User> users, Graph<String, TradeEdge> graph) {
        users.stream()
                .map(User::getUserId)
                .forEach(graph::addVertex);
    }

}
