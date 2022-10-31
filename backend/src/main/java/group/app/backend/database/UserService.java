package group.app.backend.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	public void addUser(User newUser) {
		userRepository.save(newUser);
	};
	
	public void removeUserById(Long id) {
		userRepository.deleteById(id);
	}

}
