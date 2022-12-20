package group.app.backend.user.services;

import group.app.backend.user.entity.Major;
import group.app.backend.user.repos.MajorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MajorService {

    private final MajorRepository majorRepository;

    public void saveMajor(Major major) {
        majorRepository.save(major);
    }

    public List<Major> getAllMajors() {
        return majorRepository.findAll();
    }
}
