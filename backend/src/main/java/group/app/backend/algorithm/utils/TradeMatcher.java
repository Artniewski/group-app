package group.app.backend.algorithm.utils;

import static group.app.backend.algorithm.utils.PathsCyclesUtil.*;
import static group.app.backend.algorithm.models.TradeGraph.buildGraph;

import java.util.Comparator;
import java.util.List;
import java.util.Set;

import org.jgrapht.GraphPath;
import org.jgrapht.graph.DirectedMultigraph;

import group.app.backend.algorithm.models.TradeEdge;
import group.app.backend.algorithm.models.UserVertex;

public class TradeMatcher {

    public static Set<GraphPath<String, TradeEdge>> findOptimalCycles(List<UserVertex> users) {
        DirectedMultigraph<String, TradeEdge> graph = buildGraph(users);
        List<List<String>> cycles = getSimpleCycles(graph);
        Set<GraphPath<String, TradeEdge>> graphPaths = mapCyclesToPaths(graph, cycles);
        List<GraphPath<String, TradeEdge>> sortedGraphPaths = graphPaths.stream()
                .sorted(Comparator.comparingInt(GraphPath::getLength))
                .toList();
        return getOptimalCycles(Set.of(), sortedGraphPaths);
    }
}
