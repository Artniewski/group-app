package group.app.backend.matching;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.jgrapht.graph.Multigraph;
import org.springframework.stereotype.Service;

@Service
public class TradeMatcherService {

    public Set<TradeEdge> find(List<User> users) {
        Set<String> allOwnedTasks = users.stream()
                .map(User::getOwnedTasks)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());

        Set<String> allWantedTasks = users.stream()
                .map(User::getWantedTasks)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());

        Set<String> availableTasks = allWantedTasks.stream()
                .filter(allOwnedTasks::contains)
                .collect(Collectors.toSet());

        var graph = new Multigraph<>(TradeEdge.class);

        addUserVertices(users, graph);

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
            owners.forEach(owner -> {
                requesters.forEach(requester -> {
                    graph.addEdge(owner, requester, new TradeEdge(task));
                });
            });
        });

        return graph.edgeSet();

    }

    private static void addUserVertices(List<User> users, Multigraph<Object, TradeEdge> multiGraph) {
        users.stream()
                .map(User::getUserId)
                .forEach(multiGraph::addVertex);
    }

}
