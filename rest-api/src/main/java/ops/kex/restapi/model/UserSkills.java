package ops.kex.restapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties({"user"})
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSkills {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_SKILLS_ID_GEN")
    @SequenceGenerator(name = "USER_SKILLS_ID_GEN", sequenceName = "USER_SKILLS_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Integer id;
    private Boolean visible;
    private Integer level;
    @ManyToOne
    @JoinColumn(name = "skills_id")
    private Skills skill;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
