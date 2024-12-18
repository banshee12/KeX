package ops.kex.restapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.persistence.metamodel.StaticMetamodel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@StaticMetamodel(User.class)
//@JsonIgnoreProperties({"favorites"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_ID_GEN")
    @SequenceGenerator(name = "USER_ID_GEN", sequenceName = "USER_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Integer userId;
    private String userSub;
    private String username;
    private String email;
    private String firstname;
    private String lastname;
    private Boolean contactOptionPhone;
    private Boolean contactOptionMail;
    private Boolean contactOptionAppointment;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<UserSkills> userSkills;
    @OneToMany(cascade = CascadeType.ALL,  mappedBy = "user")
    private List<Experience> userExperience;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<ContactTime> userContactTimes;
    private Integer year;
    @OneToMany(cascade = CascadeType.ALL)
    private List<UserFavorite> favorites;
    @ElementCollection
    @CollectionTable(name = "widget_sorting", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "widget_name")
    private List<String> widgetSorting;


    public void addUserSkill(UserSkills userSkills){
        this.userSkills.add(userSkills);
    }

    public void removeUserSkill(Integer userSkillsId) {
        UserSkills userSkills = this.userSkills.stream().filter(t -> t.getId() == userSkillsId).findFirst().orElse(null);
        if (userSkills != null) {
            this.userSkills.remove(userSkills);
        }
    }

    public void addExperience(Experience experience){
        this.userExperience.add(experience);
    }

    public void removeExperience(Integer experienceId) {
        Experience experience = this.userExperience.stream().filter(t -> t.getId() == experienceId).findFirst().orElse(null);
        if (experience != null) {
            this.userExperience.remove(experience);
        }
    }

    public void addFavorite(UserFavorite userFavorite){
        this.favorites.add(userFavorite);
    }

    public void removeFavorite(Integer favoriteId) {
        UserFavorite userFavorite = this.favorites.stream().filter(t -> t.getId() == favoriteId).findFirst().orElse(null);
        if (userFavorite != null) {
            this.favorites.remove(userFavorite);
        }
    }
}