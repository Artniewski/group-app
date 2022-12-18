package group.app.backend.algorithm;

import group.app.backend.algorithm.models.TradeEdge;
import group.app.backend.algorithm.models.UserVertex;
import group.app.backend.mappers.UserMapper;
import group.app.backend.user.User;
import group.app.backend.user.UserService;
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

    public Set<GraphPath<String, TradeEdge>> makeTrades(){
        List<User> allUsers = userService.getAllUsers();
        List<UserVertex> userVertices = allUsers.stream().map(UserMapper::mapToVertex).toList();
        Set<GraphPath<String, TradeEdge>> optimalCycles = findOptimalCycles(userVertices);
        removeTasksFromUsers(optimalCycles);
        return optimalCycles;
    }

    private void removeTasksFromUsers(Set<GraphPath<String, TradeEdge>> optimalCycles){
        optimalCycles
                .stream()
                .map(GraphPath::getEdgeList)
                .flatMap(Collection::stream)
                .forEach(tradeEdge -> userService.
                        removeRequestedTaskFromUser(
                                targetToUserId(tradeEdge.getTarget()),
                                Long.parseLong(tradeEdge.getTaskId()))
                );
    }

    private Long targetToUserId(Object target){
        String stringToConvert = String.valueOf(target);
        return Long.parseLong(stringToConvert);
    }
}