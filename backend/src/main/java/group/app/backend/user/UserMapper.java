package group.app.backend.user;

import java.util.stream.Collectors;

import group.app.backend.algorithm.models.UserVertex;
import lombok.experimental.UtilityClass;

@UtilityClass
public class UserMapper {
	
	public static UserVertex mapToVertex(User user){
		
		UserVertex userVertex = new UserVertex();
		
		mapToVertex(user, userVertex);
		
		return userVertex;
	}
	
	public static void mapToVertex(User user, UserVertex userVertex){
		
		userVertex.setUserId(String.valueOf(user.getId()));
		
		userVertex.setOwnedTasks(user.getOfferedTasks().stream()
				.map(task -> String.valueOf(task.getId()))
				.collect(Collectors.toSet()));
		
		userVertex.setWantedTasks(user.getRequestedTasks().stream()
				.map(task -> String.valueOf(task.getId()))
				.collect(Collectors.toSet()));
	}
}
