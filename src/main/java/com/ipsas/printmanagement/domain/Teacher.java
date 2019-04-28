package com.ipsas.printmanagement.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * The Teacher.
 * @author A true hipster
 */
@ApiModel(description = "The Teacher. @author A true hipster")
@Entity
@Table(name = "teacher")
public class Teacher implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ordered_prints")
    private Integer orderedPrints;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "teacher")
    private Set<Teaching> teachings = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrderedPrints() {
        return orderedPrints;
    }

    public Teacher orderedPrints(Integer orderedPrints) {
        this.orderedPrints = orderedPrints;
        return this;
    }

    public void setOrderedPrints(Integer orderedPrints) {
        this.orderedPrints = orderedPrints;
    }

    public User getUser() {
        return user;
    }

    public Teacher user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Teaching> getTeachings() {
        return teachings;
    }

    public Teacher teachings(Set<Teaching> teachings) {
        this.teachings = teachings;
        return this;
    }

    public Teacher addTeaching(Teaching teaching) {
        this.teachings.add(teaching);
        teaching.setTeacher(this);
        return this;
    }

    public Teacher removeTeaching(Teaching teaching) {
        this.teachings.remove(teaching);
        teaching.setTeacher(null);
        return this;
    }

    public void setTeachings(Set<Teaching> teachings) {
        this.teachings = teachings;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Teacher teacher = (Teacher) o;
        if (teacher.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teacher.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Teacher{" +
            "id=" + getId() +
            ", orderedPrints=" + getOrderedPrints() +
            "}";
    }
}
