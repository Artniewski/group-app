package group.app.backend.algorithm;

import group.app.backend.algorithm.models.TradeEdge;
import group.app.backend.algorithm.models.UserVertex;
import group.app.backend.user.utils.UserMapper;
import group.app.backend.user.entity.User;
import group.app.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;

import org.jgrapht.GraphPath;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import static group.app.backend.algorithm.utils.TradeMatcher.findOptimalCycles;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final UserService userService;

    public Set<GraphPath<String, TradeEdge>> makeTrades() {
        List<User> allUsers = userService.getAllUsers();
        List<UserVertex> userVertices = allUsers.stream().map(UserMapper::mapToVertex).toList();
        Set<GraphPath<String, TradeEdge>> optimalCycles = findOptimalCycles(userVertices);
        removeTasksFromUsers(optimalCycles);
        return optimalCycles;
    }

    private void removeTasksFromUsers(Set<GraphPath<String, TradeEdge>> optimalCycles) {
        getFinalEdges(optimalCycles)
                .forEach(tradeEdge -> userService.
                        removeRequestedTaskFromUser(
                                String.valueOf(tradeEdge.getTarget()),
                                Long.parseLong(tradeEdge.getTaskId()))
                );
    }

    public static List<TradeEdge> getFinalEdges(Set<GraphPath<String, TradeEdge>> optimalCycles) {
        return optimalCycles
                .stream()
                .map(GraphPath::getEdgeList)
                .flatMap(Collection::stream)
                .toList();
    }
}