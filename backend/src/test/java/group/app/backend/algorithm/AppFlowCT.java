package group.app.backend.algorithm;

//make Component test that will check if algorithm works correctly

import group.app.backend.jsos.client.JsosAppClient;
import group.app.backend.jsos.dto.AuthResponseDTO;
import group.app.backend.jsos.dto.JsosUserDTO;
import group.app.backend.jsos.services.JsosService;
import group.app.backend.jsos.services.SessionService;
import group.app.backend.user.services.CourseService;
import group.app.backend.user.services.TaskListService;
import group.app.backend.user.services.TaskService;
import group.app.backend.user.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class AppFlowCT {

    public static final String JSOSSESSID = "jsossessid";
    public static final String USER_ID = "1";
    @Mock
    private JsosAppClient jsosAppClient;
    @Mock
    private JsosService jsosService;
    @Mock
    private UserService userService;
    @Mock
    private TaskListService taskListService;
    @Mock
    private TaskService taskService;
    @Mock
    private CourseService courseService;

    @InjectMocks
    private SessionService sessionService;

    @BeforeEach
    void setUp() {
        when(jsosAppClient.authenticate(any())).thenReturn(AuthResponseDTO.builder()
                .jsossessid(JSOSSESSID)
                .build());

        when(jsosAppClient.getUserId(any())).thenReturn(JsosUserDTO.builder()
                .userId(USER_ID)
                .build());
    }

    @Test
    public void test() {
        sessionService.getTasksBySession(JSOSSESSID);
    }
}
