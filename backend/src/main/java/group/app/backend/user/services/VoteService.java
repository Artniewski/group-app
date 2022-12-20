package group.app.backend.user.services;

import group.app.backend.user.entity.User;
import group.app.backend.user.entity.Vote;
import group.app.backend.user.repos.UserRepository;
import group.app.backend.user.repos.VoteRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoteService {
	
	private final UserRepository ur;
	private final VoteRepository vr;
	
	public void addVote(String fromId, String toId) {
		boolean voted = vr.findAll().stream()
				.anyMatch(vote -> vote.getFromId().equals(fromId));
		
		Vote newVote;
		if (voted) {
			newVote = vr.findAll().stream()
					.filter(vote -> vote.getFromId().equals(fromId))
					.collect(Collectors.toList()).get(0);
		} else {
			newVote = new Vote(fromId, toId);
		}
		
		newVote.setToId(toId);
		
		vr.save(newVote);
		if(isNewOldMan(toId)) {
			makeYoungMan(fromId);
			makeOldMan(toId);
		}
	}
	
	public Long getVotes(String userId) {
		return vr.findAll().stream()
				.filter(vote -> vote.getFromId().equals(userId))
				.count();
	}
	
	
	public boolean isNewOldMan(String userId) {
		User currOldMan = getOldMan(ur.findById(userId).get());
		
		if (currOldMan == null) {
			return true;
		}
		
		return getVotes(userId) > getVotes(currOldMan.getId());
		
	}
	
	public User getOldMan(User user) {
		
		try {
			return ur.findById(vr.findAll().stream()
					.filter(vote -> getTo(vote).getMajor().equals(user.getMajor()))
					.filter(vote -> getTo(vote).isOldMan())
					.collect(Collectors.toList()).get(0).getToId()).get();
		} catch (Exception e) {
				return null;
		}
	}
	
	public void makeOldMan(String userId) {
		User user = ur.findById(userId).get();
		user.setOldMan(true);
		ur.save(user);
	}
	
	public void makeYoungMan(String userId) {
		User user = ur.findById(userId).get();
		user.setOldMan(false);
		ur.save(user);
	}
	
	public User getFrom(Vote vote) {
		return ur.findById(vote.getFromId()).get();
	}
	
	public User getTo(Vote vote) {
		return ur.findById(vote.getToId()).get();
	}
}
