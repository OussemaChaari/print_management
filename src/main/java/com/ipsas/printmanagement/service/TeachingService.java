package com.ipsas.printmanagement.service;

import com.ipsas.printmanagement.domain.Teaching;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Teaching.
 */
public interface TeachingService {

    /**
     * Save a teaching.
     *
     * @param teaching the entity to save
     * @return the persisted entity
     */
    Teaching save(Teaching teaching);

    /**
     * Get all the teachings.
     *
     * @return the list of entities
     */
    List<Teaching> findAll();


    /**
     * Get the "id" teaching.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Teaching> findOne(Long id);

    /**
     * Delete the "id" teaching.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
