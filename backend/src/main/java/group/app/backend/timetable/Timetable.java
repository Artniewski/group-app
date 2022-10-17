package group.app.backend.timetable;

import lombok.Builder;
import lombok.Data;
import org.joda.time.DateTime;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class Timetable {

	private List<Group> schedule;
	private DateTime currDate;
	
	public Group getCurrentGroup() {
		
		currDate = DateTime.now();
		
		try { return schedule.stream()
				.filter(group -> group.getGroupDate().getStartDate().compareTo(currDate) < 0)
				.filter(group -> group.getGroupDate().getEndDate().compareTo(currDate) > 0)
				.collect(Collectors.toList()).get(0); }
		catch (NullPointerException e) {
			return null;
		}
	}
}
