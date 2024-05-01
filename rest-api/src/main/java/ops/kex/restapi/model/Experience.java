package ops.kex.restapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private Boolean visible;
    private String description;
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST})
    private List<Skills> skill;


    public void addSkill(Skills skills){
        this.skill.add(skills);
    }

    public void removeSkill(Integer skillsId) {
        Skills skills = this.skill.stream().filter(t -> t.getId() == skillsId).findFirst().orElse(null);
        if (skills != null) {
            this.skill.remove(skills);
        }
    }
}
