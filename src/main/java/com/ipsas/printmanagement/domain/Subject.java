package com.ipsas.printmanagement.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Subject.
 */
@Entity
@Table(name = "subject")
public class Subject implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "subject")
    private Set<Teaching> teachings = new HashSet<>();
    @ManyToMany(mappedBy = "subjects")
    @JsonIgnore
    private Set<Group> groups = new HashSet<>();

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

    public Subject name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Teaching> getTeachings() {
        return teachings;
    }

    public Subject teachings(Set<Teaching> teachings) {
        this.teachings = teachings;
        return this;
    }

    public Subject addTeaching(Teaching teaching) {
        this.teachings.add(teaching);
        teaching.setSubject(this);
        return this;
    }

    public Subject removeTeaching(Teaching teaching) {
        this.teachings.remove(teaching);
        teaching.setSubject(null);
        return this;
    }

    public void setTeachings(Set<Teaching> teachings) {
        this.teachings = teachings;
    }

    public Set<Group> getGroups() {
        return groups;
    }

    public Subject groups(Set<Group> groups) {
        this.groups = groups;
        return this;
    }

    public Subject addGroup(Group group) {
        this.groups.add(group);
        group.getSubjects().add(this);
        return this;
    }

    public Subject removeGroup(Group group) {
        this.groups.remove(group);
        group.getSubjects().remove(this);
        return this;
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
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
        Subject subject = (Subject) o;
        if (subject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Subject{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
