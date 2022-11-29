package group.app.backend.matching;

import static org.jgrapht.alg.cycle.Cycles.simpleCycleToGraphPath;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.jgrapht.GraphPath;
import org.jgrapht.alg.cycle.SzwarcfiterLauerSimpleCycles;
import org.jgrapht.alg.shortestpath.AllDirectedPaths;
import org.jgrapht.graph.DirectedMultigraph;

public class PathsCyclesUtil {

    public static List<List<String>> getSimpleCycles(DirectedMultigraph<String, TradeEdge> graph) {
        return new SzwarcfiterLauerSimpleCycles<>(graph).findSimpleCycles();
    }

    public static Set<GraphPath<String, TradeEdge>> mapCyclesToPaths(DirectedMultigraph<String, TradeEdge> graph, List<List<String>> cycles) {
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

    private static List<GraphPath<String, TradeEdge>> getDistinctPaths(GraphPath<String, TradeEdge> currentPath, List<GraphPath<String, TradeEdge>> paths) {
        return paths.stream()
                .filter(path -> path.getLength() <= currentPath.getLength())
                .filter(path -> path
                        .getEdgeList()
                        .stream()
                        .noneMatch(currentPath.getEdgeList()::contains))
                .toList();
    }

    public static Set<GraphPath<String, TradeEdge>> getOptimalCycles(Set<GraphPath<String, TradeEdge>> currentCycles,
                                                               List<GraphPath<String, TradeEdge>> remainingCycles) {
        if (remainingCycles.isEmpty()) {
            return currentCycles;
        }

        return remainingCycles
                .stream()
                .map(remCycle -> {
                    Set<GraphPath<String, TradeEdge>> newCurrentCycles = new HashSet<>(currentCycles);
                    newCurrentCycles.add(remCycle);
                    return getOptimalCycles(newCurrentCycles, getDistinctPaths(remCycle, remainingCycles));
                })
                .max(Comparator.comparingInt(set -> set.stream().mapToInt(GraphPath::getLength).sum()))
                .orElse(Set.of());
    }

}
