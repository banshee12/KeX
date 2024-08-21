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
@Table(name = "user_favorites")
public class UserFavorite {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_FAVORITE_ID_GEN")
    @SequenceGenerator(name = "USER_FAVORITE_ID_GEN", sequenceName = "USER_FAVORITE_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Integer id;

    @Column(name = "user_sub")
    private String userSub;

    @Column(name = "favorite_user_sub")
    private String favoriteUserSub;
}
