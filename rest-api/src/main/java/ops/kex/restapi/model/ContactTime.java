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
public class ContactTime {
    @Id
    @SequenceGenerator(
            name = "contactTime_sequence",
            sequenceName = "contactTime_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "contactTime_sequence"
    )
    private Integer id;
    private String day;
    private String fromTime;
    private String toTime;
}
