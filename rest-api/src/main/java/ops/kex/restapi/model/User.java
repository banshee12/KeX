package ops.kex.restapi.model;

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
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    private String userSub;
    private String username;
    private String email;
    private String firstname;
    private String lastname;
    private Boolean contactOptionPhone;
    private Boolean contactOptionMail;
    private Boolean contactOptionAppointment;
    @OneToMany(fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<UserSkills> userSkills;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Experience> userExperience;
    @OneToMany(cascade = CascadeType.ALL)
    private List<ContactTime> userContactTimes;



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
}
