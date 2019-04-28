package com.ipsas.printmanagement.service.impl;

import com.ipsas.printmanagement.service.SubjectService;
import com.ipsas.printmanagement.domain.Subject;
import com.ipsas.printmanagement.repository.SubjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Subject.
 */
@Service
@Transactional
public class SubjectServiceImpl implements SubjectService {

    private final Logger log = LoggerFactory.getLogger(SubjectServiceImpl.class);

    private final SubjectRepository subjectRepository;

    public SubjectServiceImpl(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    /**
     * Save a subject.
     *
     * @param subject the entity to save
     * @return the persisted entity
     */
    @Override
    public Subject save(Subject subject) {
        log.debug("Request to save Subject : {}", subject);
        return subjectRepository.save(subject);
    }

    /**
     * Get all the subjects.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Subject> findAll() {
        log.debug("Request to get all Subjects");
        return subjectRepository.findAll();
    }


    /**
     * Get one subject by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Subject> findOne(Long id) {
        log.debug("Request to get Subject : {}", id);
        return subjectRepository.findById(id);
    }

    /**
     * Delete the subject by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Subject : {}", id);
        subjectRepository.deleteById(id);
    }
}
