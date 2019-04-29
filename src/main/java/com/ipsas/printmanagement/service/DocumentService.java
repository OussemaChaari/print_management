package com.ipsas.printmanagement.service;

import com.ipsas.printmanagement.domain.Document;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Document.
 */
public interface DocumentService {

    /**
     * Save a document.
     *
     * @param document the entity to save
     * @return the persisted entity
     */
    Document save(Document document);


    String storeFile(Document document);
    /**
     * Get all the documents.
     *
     * @return the list of entities
     */
    List<Document> findAll();


    /**
     * Get the "id" document.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Document> findOne(Long id);

    /**
     * Delete the "id" document.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
