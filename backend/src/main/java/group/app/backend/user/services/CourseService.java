package group.app.backend.user.services;

import group.app.backend.exceptions.ResourceNotFoundException;
import group.app.backend.user.entity.Course;
import group.app.backend.user.repos.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public Course getCourseById(String id) {
        return courseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    public void deleteCourse(String id) {
        courseRepository.deleteById(id);
    }
}
