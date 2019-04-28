package com.ipsas.printmanagement.service.impl;

import com.ipsas.printmanagement.service.TeachingService;
import com.ipsas.printmanagement.domain.Teaching;
import com.ipsas.printmanagement.repository.TeachingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Teaching.
 */
@Service
@Transactional
public class TeachingServiceImpl implements TeachingService {

    private final Logger log = LoggerFactory.getLogger(TeachingServiceImpl.class);

    private final TeachingRepository teachingRepository;

    public TeachingServiceImpl(TeachingRepository teachingRepository) {
        this.teachingRepository = teachingRepository;
    }

    /**
     * Save a teaching.
     *
     * @param teaching the entity to save
     * @return the persisted entity
     */
    @Override
    public Teaching save(Teaching teaching) {
        log.debug("Request to save Teaching : {}", teaching);
        return teachingRepository.save(teaching);
    }

    /**
     * Get all the teachings.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Teaching> findAll() {
        log.debug("Request to get all Teachings");
        return teachingRepository.findAll();
    }


    /**
     * Get one teaching by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Teaching> findOne(Long id) {
        log.debug("Request to get Teaching : {}", id);
        return teachingRepository.findById(id);
    }

    /**
     * Delete the teaching by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Teaching : {}", id);
        teachingRepository.deleteById(id);
    }
}
