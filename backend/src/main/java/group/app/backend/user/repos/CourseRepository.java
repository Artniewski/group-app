package group.app.backend.user.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.app.backend.user.entity.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {

}