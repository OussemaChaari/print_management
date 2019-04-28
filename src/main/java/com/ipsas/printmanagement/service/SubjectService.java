package com.ipsas.printmanagement.service;

import com.ipsas.printmanagement.domain.Subject;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Subject.
 */
public interface SubjectService {

    /**
     * Save a subject.
     *
     * @param subject the entity to save
     * @return the persisted entity
     */
    Subject save(Subject subject);

    /**
     * Get all the subjects.
     *
     * @return the list of entities
     */
    List<Subject> findAll();


    /**
     * Get the "id" subject.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Subject> findOne(Long id);

    /**
     * Delete the "id" subject.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
