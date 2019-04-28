package com.ipsas.printmanagement.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Teaching.
 */
@Entity
@Table(name = "teaching")
public class Teaching implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "teaching")
    private Set<PrintOrder> printOrders = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("teachings")
    private Subject subject;

    @ManyToOne
    @JsonIgnoreProperties("teachings")
    private Teacher teacher;

    @ManyToOne
    @JsonIgnoreProperties("teachings")
    private Group group;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<PrintOrder> getPrintOrders() {
        return printOrders;
    }

    public Teaching printOrders(Set<PrintOrder> printOrders) {
        this.printOrders = printOrders;
        return this;
    }

    public Teaching addPrintOrder(PrintOrder printOrder) {
        this.printOrders.add(printOrder);
        printOrder.setTeaching(this);
        return this;
    }

    public Teaching removePrintOrder(PrintOrder printOrder) {
        this.printOrders.remove(printOrder);
        printOrder.setTeaching(null);
        return this;
    }

    public void setPrintOrders(Set<PrintOrder> printOrders) {
        this.printOrders = printOrders;
    }

    public Subject getSubject() {
        return subject;
    }

    public Teaching subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public Teaching teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Group getGroup() {
        return group;
    }

    public Teaching group(Group group) {
        this.group = group;
        return this;
    }

    public void setGroup(Group group) {
        this.group = group;
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
        Teaching teaching = (Teaching) o;
        if (teaching.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teaching.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Teaching{" +
            "id=" + getId() +
            "}";
    }
}
