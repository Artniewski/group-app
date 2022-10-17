package group.app.backend.timetable;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Group {
	
	private String groupName;
	private String lecturerName;
	private String groupCode;
	private WeekDay weekDay;
	private String startHour;
	private String endHour;
	private String classroom;
	
}
