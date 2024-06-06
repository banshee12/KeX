package ops.kex.restapi.model.search;

import lombok.*;
import ops.kex.restapi.model.sorting.SortData;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserSearch {
    private String searchSkill;
    private Integer minLevel;
    private SortData sortData;
}
