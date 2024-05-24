package ops.kex.restapi.model.sorting;


import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SortData {
    private String code;
    private Boolean asc;
}
