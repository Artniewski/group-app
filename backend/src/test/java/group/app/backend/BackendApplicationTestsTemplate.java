package group.app.backend;

import group.app.backend.course.CourseRepository;
import group.app.backend.task.TaskRepository;
import group.app.backend.tasklist.TaskListRepository;
import group.app.backend.user.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
abstract class BackendApplicationTestsTemplate {
    
    @Autowired
    UserRepository ur;
    
    @Autowired
    TaskRepository tr;
    
    @Autowired
    TaskListRepository tlr;
    
    @Autowired
    CourseRepository cr;
    
    @BeforeEach
    void clearDatabase(){
        List<JpaRepository> repos;
    
        repos = new ArrayList<>();
        repos.add(ur);
        repos.add(tr);
        repos.add(tlr);
        repos.add(cr);
        
        repos.forEach(JpaRepository::deleteAll);
    }
}
