package com.ipsas.printmanagement.service;

import com.ipsas.printmanagement.domain.Group;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Group.
 */
public interface GroupService {

    /**
     * Save a group.
     *
     * @param group the entity to save
     * @return the persisted entity
     */
    Group save(Group group);

    /**
     * Get all the groups.
     *
     * @return the list of entities
     */
    List<Group> findAll();

    /**
     * Get all the Group with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<Group> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" group.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Group> findOne(Long id);

    /**
     * Delete the "id" group.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
