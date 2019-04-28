package com.ipsas.printmanagement.service.impl;

import com.ipsas.printmanagement.service.PrintOrderService;
import com.ipsas.printmanagement.domain.PrintOrder;
import com.ipsas.printmanagement.repository.PrintOrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing PrintOrder.
 */
@Service
@Transactional
public class PrintOrderServiceImpl implements PrintOrderService {

    private final Logger log = LoggerFactory.getLogger(PrintOrderServiceImpl.class);

    private final PrintOrderRepository printOrderRepository;

    public PrintOrderServiceImpl(PrintOrderRepository printOrderRepository) {
        this.printOrderRepository = printOrderRepository;
    }

    /**
     * Save a printOrder.
     *
     * @param printOrder the entity to save
     * @return the persisted entity
     */
    @Override
    public PrintOrder save(PrintOrder printOrder) {
        log.debug("Request to save PrintOrder : {}", printOrder);
        return printOrderRepository.save(printOrder);
    }

    /**
     * Get all the printOrders.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PrintOrder> findAll() {
        log.debug("Request to get all PrintOrders");
        return printOrderRepository.findAll();
    }


    /**
     * Get one printOrder by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PrintOrder> findOne(Long id) {
        log.debug("Request to get PrintOrder : {}", id);
        return printOrderRepository.findById(id);
    }

    /**
     * Delete the printOrder by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PrintOrder : {}", id);
        printOrderRepository.deleteById(id);
    }
}
