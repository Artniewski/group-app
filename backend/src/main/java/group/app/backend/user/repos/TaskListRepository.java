package group.app.backend.user.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.app.backend.user.entity.TaskList;

@Repository
public interface TaskListRepository extends JpaRepository<TaskList, Long> {

}
