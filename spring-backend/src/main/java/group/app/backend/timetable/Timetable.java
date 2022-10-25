package group.app.backend.timetable;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class Timetable {

	private List<Group> schedule;

}
