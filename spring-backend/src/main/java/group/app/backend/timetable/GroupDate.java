package group.app.backend.timetable;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GroupDate {
	
	private WeekDay weekDay;
	private String startHour;
	private String endHour;
	private String classroom;
	
}
