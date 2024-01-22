package ops.kex.restapi.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Tags {
    @Id
    @GeneratedValue
    private Integer id;
    private String tag;

    public Tags() {
    }

    public Tags(String tag) {
        this.tag = tag;
    }

    public Integer getId() {
        return id;
    }

    public String getTag() {
        return tag;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    @Override
    public String toString() {
        return "Tags{" +
                "id=" + id +
                ", tag='" + tag + '\'' +
                '}';
    }
}
