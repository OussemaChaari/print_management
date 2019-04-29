package com.ipsas.printmanagement.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * The Employee entity.
 * @author A true hipster
 */
@ApiModel(description = "The Employee entity. @author A true hipster")
@Entity
@Table(name = "employee")
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "prints_number")
    private Integer printsNumber;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "employee",cascade = CascadeType.REMOVE)
    private Set<PrintOrder> printOrders = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPrintsNumber() {
        return printsNumber;
    }

    public Employee printsNumber(Integer printsNumber) {
        this.printsNumber = printsNumber;
        return this;
    }

    public void setPrintsNumber(Integer printsNumber) {
        this.printsNumber = printsNumber;
    }

    public User getUser() {
        return user;
    }

    public Employee user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<PrintOrder> getPrintOrders() {
        return printOrders;
    }

    public Employee printOrders(Set<PrintOrder> printOrders) {
        this.printOrders = printOrders;
        return this;
    }

    public Employee addPrintOrder(PrintOrder printOrder) {
        this.printOrders.add(printOrder);
        printOrder.setEmployee(this);
        return this;
    }

    public Employee removePrintOrder(PrintOrder printOrder) {
        this.printOrders.remove(printOrder);
        printOrder.setEmployee(null);
        return this;
    }

    public void setPrintOrders(Set<PrintOrder> printOrders) {
        this.printOrders = printOrders;
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
        Employee employee = (Employee) o;
        if (employee.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employee.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", printsNumber=" + getPrintsNumber() +
            "}";
    }
}
