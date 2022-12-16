package group.app.backend.mappers;

import group.app.backend.user.User;
import group.app.backend.matching.UserVertex;
import group.app.backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.stream.Collectors;

public class UserMapper {

	
	private final UserService us;
	
	@Autowired
	public UserMapper(UserService us) {
		this.us = us;
	}
	
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
