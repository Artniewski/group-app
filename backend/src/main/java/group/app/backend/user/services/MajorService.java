package group.app.backend.user.services;

import group.app.backend.user.repos.MajorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MajorService {

    private final MajorRepository majorRepository;

}
