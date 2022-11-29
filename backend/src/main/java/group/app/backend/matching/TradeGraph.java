package group.app.backend.matching;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.jgrapht.Graph;
import org.jgrapht.graph.DirectedMultigraph;

public class TradeGraph {

    public static DirectedMultigraph<String, TradeEdge> buildGraph(List<User> users) {
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
