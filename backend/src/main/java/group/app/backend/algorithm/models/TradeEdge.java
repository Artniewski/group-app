package group.app.backend.algorithm.models;

import java.util.Objects;

import org.jgrapht.graph.DefaultEdge;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TradeEdge extends DefaultEdge {

    private String taskId;

    public TradeEdge(String taskId) {
        this.taskId = taskId;
    }

    public Object getSource() {
        return super.getSource();
    }

    public Object getTarget() {
        return super.getTarget();
    }

    public String getTaskId() {
        return taskId;
    }

    public boolean equalTrade(TradeEdge edge) {
        return taskId.equals(edge.taskId) && Objects.equals(getTarget(), edge.getTarget());
    }

    @Override
    public String toString() {
        return "(" + getSource() + " : " + getTarget() + " : " + taskId + ")";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        TradeEdge tradeEdge = (TradeEdge) o;
        return Objects.equals(taskId, tradeEdge.taskId);
    }

    @Override
    public int hashCode() {
        int hash = super.hashCode();
        hash = 89 * hash + (this.taskId != null ? this.taskId.hashCode() : 0);
        return hash;
    }
}
