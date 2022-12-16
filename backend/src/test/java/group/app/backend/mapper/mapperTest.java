package group.app.backend.mapper;

import group.app.backend.course.Course;
import group.app.backend.mappers.UserMapper;
import group.app.backend.matching.UserVertex;
import group.app.backend.task.Task;
import group.app.backend.user.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

public class mapperTest {
	
	User user;
	UserVertex userVertex;
	
	@BeforeEach
	private void buildTests() {
		user = new User();
		
		//Dodanie Id
		user.setId(1L);
		
		//Dodanie oferowanych tasków
		Task task1 = new Task();
		task1.setId(1L);
		user.addOfferedTask(task1);
		
		Task task2 = new Task();
		task2.setId(2L);
		user.addOfferedTask(task2);
		
		Task task3 = new Task();
		task3.setId(3L);
		user.addOfferedTask(task3);
		
		//Dodanie szukanych tasków
		Task task4 = new Task();
		task4.setId(4L);
		user.addRequestedTask(task4);
		
		Task task5 = new Task();
		task5.setId(5L);
		user.addRequestedTask(task5);
		
		Task task6 = new Task();
		task6.setId(6L);
		user.addRequestedTask(task6);
		
		//Mapowanie
		userVertex = UserMapper.mapToVertex(user);
	}
	
	@Test
	public void testMappingId() {
		System.out.println(userVertex.getUserId());
		Assertions.assertEquals(userVertex.getUserId(), "1");
	}
	
	@Test
	public void testMappingOwned() {
		
		Assertions.assertEquals(userVertex.getOwnedTasks().size(), 3);
		Assertions.assertTrue(userVertex.getOwnedTasks().contains("1"));
		Assertions.assertTrue(userVertex.getOwnedTasks().contains("2"));
		Assertions.assertTrue(userVertex.getOwnedTasks().contains("3"));
	}
	
	@Test
	public void testMappingWanted() {
		
		Assertions.assertEquals(userVertex.getWantedTasks().size(), 3);
		Assertions.assertTrue(userVertex.getWantedTasks().contains("4"));
		Assertions.assertTrue(userVertex.getWantedTasks().contains("5"));
		Assertions.assertTrue(userVertex.getWantedTasks().contains("6"));
	}
}
