package com.ipsas.printmanagement.web.rest;

import com.ipsas.printmanagement.PrintManagementApp;

import com.ipsas.printmanagement.domain.Teaching;
import com.ipsas.printmanagement.repository.TeachingRepository;
import com.ipsas.printmanagement.service.TeachingService;
import com.ipsas.printmanagement.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.ipsas.printmanagement.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TeachingResource REST controller.
 *
 * @see TeachingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrintManagementApp.class)
public class TeachingResourceIntTest {

    @Autowired
    private TeachingRepository teachingRepository;

    @Autowired
    private TeachingService teachingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTeachingMockMvc;

    private Teaching teaching;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TeachingResource teachingResource = new TeachingResource(teachingService);
        this.restTeachingMockMvc = MockMvcBuilders.standaloneSetup(teachingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Teaching createEntity(EntityManager em) {
        Teaching teaching = new Teaching();
        return teaching;
    }

    @Before
    public void initTest() {
        teaching = createEntity(em);
    }

    @Test
    @Transactional
    public void createTeaching() throws Exception {
        int databaseSizeBeforeCreate = teachingRepository.findAll().size();

        // Create the Teaching
        restTeachingMockMvc.perform(post("/api/teachings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teaching)))
            .andExpect(status().isCreated());

        // Validate the Teaching in the database
        List<Teaching> teachingList = teachingRepository.findAll();
        assertThat(teachingList).hasSize(databaseSizeBeforeCreate + 1);
        Teaching testTeaching = teachingList.get(teachingList.size() - 1);
    }

    @Test
    @Transactional
    public void createTeachingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teachingRepository.findAll().size();

        // Create the Teaching with an existing ID
        teaching.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeachingMockMvc.perform(post("/api/teachings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teaching)))
            .andExpect(status().isBadRequest());

        // Validate the Teaching in the database
        List<Teaching> teachingList = teachingRepository.findAll();
        assertThat(teachingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTeachings() throws Exception {
        // Initialize the database
        teachingRepository.saveAndFlush(teaching);

        // Get all the teachingList
        restTeachingMockMvc.perform(get("/api/teachings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teaching.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getTeaching() throws Exception {
        // Initialize the database
        teachingRepository.saveAndFlush(teaching);

        // Get the teaching
        restTeachingMockMvc.perform(get("/api/teachings/{id}", teaching.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(teaching.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTeaching() throws Exception {
        // Get the teaching
        restTeachingMockMvc.perform(get("/api/teachings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTeaching() throws Exception {
        // Initialize the database
        teachingService.save(teaching);

        int databaseSizeBeforeUpdate = teachingRepository.findAll().size();

        // Update the teaching
        Teaching updatedTeaching = teachingRepository.findById(teaching.getId()).get();
        // Disconnect from session so that the updates on updatedTeaching are not directly saved in db
        em.detach(updatedTeaching);

        restTeachingMockMvc.perform(put("/api/teachings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTeaching)))
            .andExpect(status().isOk());

        // Validate the Teaching in the database
        List<Teaching> teachingList = teachingRepository.findAll();
        assertThat(teachingList).hasSize(databaseSizeBeforeUpdate);
        Teaching testTeaching = teachingList.get(teachingList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTeaching() throws Exception {
        int databaseSizeBeforeUpdate = teachingRepository.findAll().size();

        // Create the Teaching

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTeachingMockMvc.perform(put("/api/teachings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teaching)))
            .andExpect(status().isBadRequest());

        // Validate the Teaching in the database
        List<Teaching> teachingList = teachingRepository.findAll();
        assertThat(teachingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTeaching() throws Exception {
        // Initialize the database
        teachingService.save(teaching);

        int databaseSizeBeforeDelete = teachingRepository.findAll().size();

        // Delete the teaching
        restTeachingMockMvc.perform(delete("/api/teachings/{id}", teaching.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Teaching> teachingList = teachingRepository.findAll();
        assertThat(teachingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Teaching.class);
        Teaching teaching1 = new Teaching();
        teaching1.setId(1L);
        Teaching teaching2 = new Teaching();
        teaching2.setId(teaching1.getId());
        assertThat(teaching1).isEqualTo(teaching2);
        teaching2.setId(2L);
        assertThat(teaching1).isNotEqualTo(teaching2);
        teaching1.setId(null);
        assertThat(teaching1).isNotEqualTo(teaching2);
    }
}
