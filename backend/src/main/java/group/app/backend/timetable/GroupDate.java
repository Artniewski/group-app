package group.app.backend.timetable;

import lombok.Builder;
import lombok.Data;
import org.joda.time.DateTime;

@Data
@Builder
public class GroupDate {
	
	private DateTime startDate;
	private DateTime endDate;
	private String classroom;
	
}
