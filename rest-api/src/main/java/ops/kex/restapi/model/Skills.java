package ops.kex.restapi.model;

import jakarta.persistence.*;

@Entity
public class Skills {
    @Id
    @SequenceGenerator(
            name = "skills_sequence",
            sequenceName = "skills_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "skills_sequence"
    )
    private Integer id;
    private String skill;

    public Skills() {
    }

    public Skills(String skill) {
        this.skill = skill;
    }

    public Integer getId() {
        return id;
    }

    public String getSkill() {
        return skill;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    @Override
    public String toString() {
        return "Skills{" +
                "id=" + id +
                ", skill='" + skill + '\'' +
                '}';
    }
}
