package ops.kex.restapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSkills {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Boolean visible;
    private Integer level;
    @ManyToOne(fetch = FetchType.LAZY,
            cascade =
                    {CascadeType.PERSIST,
                            CascadeType.MERGE})
    @JoinColumn(name = "skills_id")
    private Skills skill;
}
