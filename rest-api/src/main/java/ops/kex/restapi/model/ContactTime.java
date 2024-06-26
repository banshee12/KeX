package ops.kex.restapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@JsonIgnoreProperties({"user"})
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactTime {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CONTACT_TIME_ID_GEN")
    @SequenceGenerator(name = "CONTACT_TIME_ID_GEN", sequenceName = "CONTACT_TIME_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Integer id;
    private String day;
    private LocalDateTime fromTime;
    private LocalDateTime toTime;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
