package ops.kex.restapi.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Skills {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SKILLS_ID_GEN")
    @SequenceGenerator(name = "SKILLS_ID_GEN", sequenceName = "SKILLS_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Integer id;
    private String title;
}
