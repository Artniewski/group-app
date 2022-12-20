package group.app.backend.user.repos;

import group.app.backend.user.entity.ids.MajorID;
import group.app.backend.user.entity.Major;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MajorRepository extends JpaRepository<Major, MajorID> {

}