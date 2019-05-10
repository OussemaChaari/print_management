package com.ipsas.printmanagement.web.rest;

import com.ipsas.printmanagement.domain.Teaching;
import com.ipsas.printmanagement.repository.TeachingRepository;
import com.ipsas.printmanagement.service.TeachingService;
import com.ipsas.printmanagement.web.rest.errors.BadRequestAlertException;
import com.ipsas.printmanagement.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Teaching.
 */
@RestController
@RequestMapping("/api")
public class TeachingResource {

    private final Logger log = LoggerFactory.getLogger(TeachingResource.class);

    private static final String ENTITY_NAME = "teaching";

    private final TeachingService teachingService;

    public TeachingResource(TeachingService teachingService) {
        this.teachingService = teachingService;
    }

    /**
     * POST  /teachings : Create a new teaching.
     *
     * @param teaching the teaching to create
     * @return the ResponseEntity with status 201 (Created) and with body the new teaching, or with status 400 (Bad Request) if the teaching has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/teachings")
    public ResponseEntity<Teaching> createTeaching(@RequestBody Teaching teaching) throws URISyntaxException {
        log.debug("REST request to save Teaching : {}", teaching);
        if (teaching.getId() != null) {
            throw new BadRequestAlertException("A new teaching cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Teaching result = teachingService.save(teaching);
        return ResponseEntity.created(new URI("/api/teachings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /teachings : Updates an existing teaching.
     *
     * @param teaching the teaching to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated teaching,
     * or with status 400 (Bad Request) if the teaching is not valid,
     * or with status 500 (Internal Server Error) if the teaching couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/teachings")
    public ResponseEntity<Teaching> updateTeaching(@RequestBody Teaching teaching) throws URISyntaxException {
        log.debug("REST request to update Teaching : {}", teaching);
        if (teaching.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Teaching result = teachingService.save(teaching);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, teaching.getId().toString()))
            .body(result);
    }

    /**
     * GET  /teachings : get all the teachings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of teachings in body
     */
    @GetMapping("/teachings")
    public List<Teaching> getAllTeachings() {
        log.debug("REST request to get all Teachings");
        return teachingService.findAll();
    }

    /**
     * GET  /teachings/:id : get the "id" teaching.
     *
     * @param id the id of the teaching to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the teaching, or with status 404 (Not Found)
     */
    @GetMapping("/teachings/{id}")
    public ResponseEntity<Teaching> getTeaching(@PathVariable Long id) {
        log.debug("REST request to get Teaching : {}", id);
        Optional<Teaching> teaching = teachingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(teaching);
    }

    @Autowired
    TeachingRepository teachingRepository;

    @GetMapping("/teachings/TeacherId/{id}")
    public List<Teaching> getTeachingsByTeacher(@PathVariable Long id) {
        List<Teaching> teachings = teachingRepository.findAllByTeacherId(id);
        return teachings;
    }

    @GetMapping("/teachings/{teacherId}/{groupId}/{subjectId}")
    public Teaching getTeachingsByTeacher(@PathVariable Long teacherId, @PathVariable Long groupId, @PathVariable Long subjectId) {
        Teaching teaching = teachingRepository.findByTeacherAndGroupAndSubject(teacherId, groupId, subjectId);
        return teaching;
    }

    /**
     * DELETE  /teachings/:id : delete the "id" teaching.
     *
     * @param id the id of the teaching to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/teachings/{id}")
    public ResponseEntity<Void> deleteTeaching(@PathVariable Long id) {
        log.debug("REST request to delete Teaching : {}", id);
        teachingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
