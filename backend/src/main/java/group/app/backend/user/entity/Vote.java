package group.app.backend.user.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "votes")
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Vote {

	@Id
	private String fromId;
	private String toId;
	
}
