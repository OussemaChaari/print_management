package com.ipsas.printmanagement.service;

import com.ipsas.printmanagement.domain.PrintOrder;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing PrintOrder.
 */
public interface PrintOrderService {

    /**
     * Save a printOrder.
     *
     * @param printOrder the entity to save
     * @return the persisted entity
     */
    PrintOrder save(PrintOrder printOrder);

    /**
     * Get all the printOrders.
     *
     * @return the list of entities
     */
    List<PrintOrder> findAll();


    /**
     * Get the "id" printOrder.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PrintOrder> findOne(Long id);

    /**
     * Delete the "id" printOrder.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
