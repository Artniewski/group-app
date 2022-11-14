package group.app.backend;

import group.app.backend.user.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserTests extends BackendApplicationTestsTemplate {

    @Test
    void savingUsersActuallyWorks() {
        Assertions.assertThat(ur.findAll()).isEmpty();
        
        User dummyUser = new User();
        ur.save(dummyUser);
        
        Assertions.assertThat(ur.findAll()).isNotEmpty();
    }
}
