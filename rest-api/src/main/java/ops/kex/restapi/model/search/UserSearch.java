package ops.kex.restapi.model.search;

import lombok.*;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserSearch {
    private String searchSkill;
    private Integer minLevel;
}
