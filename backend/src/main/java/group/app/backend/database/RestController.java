package group.app.backend.database;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping(value = "/user")
public class RestController {

	private final UserService userService;
	
	public RestController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/all")
	public List<User> getAllUsers(){
		return userService.getAllUsers();
	}
	
	@PostMapping("/add")
	public void addUser(@RequestBody User newUser) {
		userService.addUser(newUser);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteUser(@PathVariable Long id) {
		userService.removeUserById(id);
	}
	
}
