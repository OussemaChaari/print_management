package com.ipsas.printmanagement.web.rest;

import com.ipsas.printmanagement.PrintManagementApp;

import com.ipsas.printmanagement.domain.PrintOrder;
import com.ipsas.printmanagement.repository.PrintOrderRepository;
import com.ipsas.printmanagement.service.PrintOrderService;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.ipsas.printmanagement.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ipsas.printmanagement.domain.enumeration.Status;
/**
 * Test class for the PrintOrderResource REST controller.
 *
 * @see PrintOrderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrintManagementApp.class)
public class PrintOrderResourceIntTest {

    private static final Instant DEFAULT_CREATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_RECIEVING_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_RECIEVING_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Status DEFAULT_STATUS = Status.INPROGRESS;
    private static final Status UPDATED_STATUS = Status.PENDING;

    @Autowired
    private PrintOrderRepository printOrderRepository;

    @Autowired
    private PrintOrderService printOrderService;

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

    private MockMvc restPrintOrderMockMvc;

    private PrintOrder printOrder;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrintOrderResource printOrderResource = new PrintOrderResource(printOrderService);
        this.restPrintOrderMockMvc = MockMvcBuilders.standaloneSetup(printOrderResource)
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
    public static PrintOrder createEntity(EntityManager em) {
        PrintOrder printOrder = new PrintOrder()
            .creationDate(DEFAULT_CREATION_DATE)
            .recievingDate(DEFAULT_RECIEVING_DATE)
            .status(DEFAULT_STATUS);
        return printOrder;
    }

    @Before
    public void initTest() {
        printOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrintOrder() throws Exception {
        int databaseSizeBeforeCreate = printOrderRepository.findAll().size();

        // Create the PrintOrder
        restPrintOrderMockMvc.perform(post("/api/print-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printOrder)))
            .andExpect(status().isCreated());

        // Validate the PrintOrder in the database
        List<PrintOrder> printOrderList = printOrderRepository.findAll();
        assertThat(printOrderList).hasSize(databaseSizeBeforeCreate + 1);
        PrintOrder testPrintOrder = printOrderList.get(printOrderList.size() - 1);
        assertThat(testPrintOrder.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testPrintOrder.getRecievingDate()).isEqualTo(DEFAULT_RECIEVING_DATE);
        assertThat(testPrintOrder.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createPrintOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = printOrderRepository.findAll().size();

        // Create the PrintOrder with an existing ID
        printOrder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrintOrderMockMvc.perform(post("/api/print-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printOrder)))
            .andExpect(status().isBadRequest());

        // Validate the PrintOrder in the database
        List<PrintOrder> printOrderList = printOrderRepository.findAll();
        assertThat(printOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCreationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = printOrderRepository.findAll().size();
        // set the field null
        printOrder.setCreationDate(null);

        // Create the PrintOrder, which fails.

        restPrintOrderMockMvc.perform(post("/api/print-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printOrder)))
            .andExpect(status().isBadRequest());

        List<PrintOrder> printOrderList = printOrderRepository.findAll();
        assertThat(printOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRecievingDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = printOrderRepository.findAll().size();
        // set the field null
        printOrder.setRecievingDate(null);

        // Create the PrintOrder, which fails.

        restPrintOrderMockMvc.perform(post("/api/print-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printOrder)))
            .andExpect(status().isBadRequest());

        List<PrintOrder> printOrderList = printOrderRepository.findAll();
        assertThat(printOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = printOrderRepository.findAll().size();
        // set the field null
        printOrder.setStatus(null);

        // Create the PrintOrder, which fails.

        restPrintOrderMockMvc.perform(post("/api/print-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printOrder)))
            .andExpect(status().isBadRequest());

        List<PrintOrder> printOrderList = printOrderRepository.findAll();
        assertThat(printOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPrintOrders() throws Exception {
        // Initialize the database
        printOrderRepository.saveAndFlush(printOrder);

        // Get all the printOrderList
        restPrintOrderMockMvc.perform(get("/api/print-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(printOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].recievingDate").value(hasItem(DEFAULT_RECIEVING_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getPrintOrder() throws Exception {
        // Initialize the database
        printOrderRepository.saveAndFlush(printOrder);

        // Get the printOrder
        restPrintOrderMockMvc.perform(get("/api/print-orders/{id}", printOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(printOrder.getId().intValue()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.recievingDate").value(DEFAULT_RECIEVING_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPrintOrder() throws Exception {
        // Get the printOrder
        restPrintOrderMockMvc.perform(get("/api/print-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrintOrder() throws Exception {
        // Initialize the database
        printOrderService.save(printOrder);

        int databaseSizeBeforeUpdate = printOrderRepository.findAll().size();

        // Update the printOrder
        PrintOrder updatedPrintOrder = printOrderRepository.findById(printOrder.getId()).get();
        // Disconnect from session so that the updates on updatedPrintOrder are not directly saved in db
        em.detach(updatedPrintOrder);
        updatedPrintOrder
            .creationDate(UPDATED_CREATION_DATE)
            .recievingDate(UPDATED_RECIEVING_DATE)
            .status(UPDATED_STATUS);

        restPrintOrderMockMvc.perform(put("/api/print-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrintOrder)))
            .andExpect(status().isOk());

        // Validate the PrintOrder in the database
        List<PrintOrder> printOrderList = printOrderRepository.findAll();
        assertThat(printOrderList).hasSize(databaseSizeBeforeUpdate);
        PrintOrder testPrintOrder = printOrderList.get(printOrderList.size() - 1);
        assertThat(testPrintOrder.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testPrintOrder.getRecievingDate()).isEqualTo(UPDATED_RECIEVING_DATE);
        assertThat(testPrintOrder.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingPrintOrder() throws Exception {
        int databaseSizeBeforeUpdate = printOrderRepository.findAll().size();

        // Create the PrintOrder

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrintOrderMockMvc.perform(put("/api/print-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printOrder)))
            .andExpect(status().isBadRequest());

        // Validate the PrintOrder in the database
        List<PrintOrder> printOrderList = printOrderRepository.findAll();
        assertThat(printOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrintOrder() throws Exception {
        // Initialize the database
        printOrderService.save(printOrder);

        int databaseSizeBeforeDelete = printOrderRepository.findAll().size();

        // Delete the printOrder
        restPrintOrderMockMvc.perform(delete("/api/print-orders/{id}", printOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PrintOrder> printOrderList = printOrderRepository.findAll();
        assertThat(printOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrintOrder.class);
        PrintOrder printOrder1 = new PrintOrder();
        printOrder1.setId(1L);
        PrintOrder printOrder2 = new PrintOrder();
        printOrder2.setId(printOrder1.getId());
        assertThat(printOrder1).isEqualTo(printOrder2);
        printOrder2.setId(2L);
        assertThat(printOrder1).isNotEqualTo(printOrder2);
        printOrder1.setId(null);
        assertThat(printOrder1).isNotEqualTo(printOrder2);
    }
}
