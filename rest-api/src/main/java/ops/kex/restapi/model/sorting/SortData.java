package ops.kex.restapi.model.sorting;


import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SortData {
    private String sortBy;
    private Boolean asc;
    private Integer size;
}
