package com.ipsas.printmanagement.web.rest;
import com.ipsas.printmanagement.domain.PrintOrder;
import com.ipsas.printmanagement.service.PrintOrderService;
import com.ipsas.printmanagement.web.rest.errors.BadRequestAlertException;
import com.ipsas.printmanagement.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PrintOrder.
 */
@RestController
@RequestMapping("/api")
public class PrintOrderResource {

    private final Logger log = LoggerFactory.getLogger(PrintOrderResource.class);

    private static final String ENTITY_NAME = "printOrder";

    private final PrintOrderService printOrderService;

    public PrintOrderResource(PrintOrderService printOrderService) {
        this.printOrderService = printOrderService;
    }

    /**
     * POST  /print-orders : Create a new printOrder.
     *
     * @param printOrder the printOrder to create
     * @return the ResponseEntity with status 201 (Created) and with body the new printOrder, or with status 400 (Bad Request) if the printOrder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/print-orders")
    public ResponseEntity<PrintOrder> createPrintOrder(@Valid @RequestBody PrintOrder printOrder) throws URISyntaxException {
        log.debug("REST request to save PrintOrder : {}", printOrder);
        if (printOrder.getId() != null) {
            throw new BadRequestAlertException("A new printOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrintOrder result = printOrderService.save(printOrder);
        return ResponseEntity.created(new URI("/api/print-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /print-orders : Updates an existing printOrder.
     *
     * @param printOrder the printOrder to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated printOrder,
     * or with status 400 (Bad Request) if the printOrder is not valid,
     * or with status 500 (Internal Server Error) if the printOrder couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/print-orders")
    public ResponseEntity<PrintOrder> updatePrintOrder(@Valid @RequestBody PrintOrder printOrder) throws URISyntaxException {
        log.debug("REST request to update PrintOrder : {}", printOrder);
        if (printOrder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PrintOrder result = printOrderService.save(printOrder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, printOrder.getId().toString()))
            .body(result);
    }

    /**
     * GET  /print-orders : get all the printOrders.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of printOrders in body
     */
    @GetMapping("/print-orders")
    public List<PrintOrder> getAllPrintOrders() {
        log.debug("REST request to get all PrintOrders");
        return printOrderService.findAll();
    }

    /**
     * GET  /print-orders/:id : get the "id" printOrder.
     *
     * @param id the id of the printOrder to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the printOrder, or with status 404 (Not Found)
     */
    @GetMapping("/print-orders/{id}")
    public ResponseEntity<PrintOrder> getPrintOrder(@PathVariable Long id) {
        log.debug("REST request to get PrintOrder : {}", id);
        Optional<PrintOrder> printOrder = printOrderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(printOrder);
    }

    /**
     * DELETE  /print-orders/:id : delete the "id" printOrder.
     *
     * @param id the id of the printOrder to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/print-orders/{id}")
    public ResponseEntity<Void> deletePrintOrder(@PathVariable Long id) {
        log.debug("REST request to delete PrintOrder : {}", id);
        printOrderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
