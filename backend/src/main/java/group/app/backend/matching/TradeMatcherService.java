package group.app.backend.matching;

import static group.app.backend.matching.PathsCyclesUtil.getSimpleCycles;
import static group.app.backend.matching.PathsCyclesUtil.mapCyclesToPaths;
import static group.app.backend.matching.TradeGraph.buildGraph;

import java.util.Comparator;
import java.util.List;
import java.util.Set;

import org.jgrapht.GraphPath;
import org.jgrapht.graph.DirectedMultigraph;
import org.springframework.stereotype.Service;

@Service
public class TradeMatcherService {

    public List<GraphPath<String, TradeEdge>> findCyclesAsPaths(List<User> users) {
        DirectedMultigraph<String, TradeEdge> graph = buildGraph(users);
        List<List<String>> cycles = getSimpleCycles(graph);
        Set<GraphPath<String, TradeEdge>> graphPaths = mapCyclesToPaths(graph, cycles);
        return graphPaths.stream()
                .sorted(Comparator.comparingInt(GraphPath::getLength))
                .toList();

    }

}
