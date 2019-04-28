package com.ipsas.printmanagement.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.ipsas.printmanagement.domain.enumeration.Status;

/**
 * A PrintOrder.
 */
@Entity
@Table(name = "print_order")
public class PrintOrder implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "creation_date", nullable = false)
    private Instant creationDate;

    @NotNull
    @Column(name = "recieving_date", nullable = false)
    private Instant recievingDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @OneToOne
    @JoinColumn(unique = true)
    private Document document;

    @ManyToOne
    @JsonIgnoreProperties("printOrders")
    private Teaching teaching;

    @ManyToOne
    @JsonIgnoreProperties("printOrders")
    private Employee employee;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public PrintOrder creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Instant getRecievingDate() {
        return recievingDate;
    }

    public PrintOrder recievingDate(Instant recievingDate) {
        this.recievingDate = recievingDate;
        return this;
    }

    public void setRecievingDate(Instant recievingDate) {
        this.recievingDate = recievingDate;
    }

    public Status getStatus() {
        return status;
    }

    public PrintOrder status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Document getDocument() {
        return document;
    }

    public PrintOrder document(Document document) {
        this.document = document;
        return this;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public Teaching getTeaching() {
        return teaching;
    }

    public PrintOrder teaching(Teaching teaching) {
        this.teaching = teaching;
        return this;
    }

    public void setTeaching(Teaching teaching) {
        this.teaching = teaching;
    }

    public Employee getEmployee() {
        return employee;
    }

    public PrintOrder employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
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
        PrintOrder printOrder = (PrintOrder) o;
        if (printOrder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), printOrder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PrintOrder{" +
            "id=" + getId() +
            ", creationDate='" + getCreationDate() + "'" +
            ", recievingDate='" + getRecievingDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
