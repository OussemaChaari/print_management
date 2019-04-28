package com.ipsas.printmanagement.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * The Group entity.
 * @author A true hipster
 */
@ApiModel(description = "The Group entity. @author A true hipster")
@Entity
@Table(name = "jhi_group")
public class Group implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * name
     */
    @NotNull
    @ApiModelProperty(value = "name", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "students_number", nullable = false)
    private Integer studentsNumber;

    @OneToMany(mappedBy = "group")
    private Set<Teaching> teachings = new HashSet<>();
    @ManyToMany
    @JoinTable(name = "jhi_group_subject",
               joinColumns = @JoinColumn(name = "group_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "subject_id", referencedColumnName = "id"))
    private Set<Subject> subjects = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Group name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStudentsNumber() {
        return studentsNumber;
    }

    public Group studentsNumber(Integer studentsNumber) {
        this.studentsNumber = studentsNumber;
        return this;
    }

    public void setStudentsNumber(Integer studentsNumber) {
        this.studentsNumber = studentsNumber;
    }

    public Set<Teaching> getTeachings() {
        return teachings;
    }

    public Group teachings(Set<Teaching> teachings) {
        this.teachings = teachings;
        return this;
    }

    public Group addTeaching(Teaching teaching) {
        this.teachings.add(teaching);
        teaching.setGroup(this);
        return this;
    }

    public Group removeTeaching(Teaching teaching) {
        this.teachings.remove(teaching);
        teaching.setGroup(null);
        return this;
    }

    public void setTeachings(Set<Teaching> teachings) {
        this.teachings = teachings;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public Group subjects(Set<Subject> subjects) {
        this.subjects = subjects;
        return this;
    }

    public Group addSubject(Subject subject) {
        this.subjects.add(subject);
        subject.getGroups().add(this);
        return this;
    }

    public Group removeSubject(Subject subject) {
        this.subjects.remove(subject);
        subject.getGroups().remove(this);
        return this;
    }

    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
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
        Group group = (Group) o;
        if (group.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), group.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Group{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", studentsNumber=" + getStudentsNumber() +
            "}";
    }
}
