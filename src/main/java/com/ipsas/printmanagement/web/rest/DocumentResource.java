package com.ipsas.printmanagement.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ipsas.printmanagement.domain.Document;
import com.ipsas.printmanagement.service.DocumentService;
import com.ipsas.printmanagement.service.FileStorageService;
import com.ipsas.printmanagement.web.rest.errors.BadRequestAlertException;
import com.ipsas.printmanagement.web.rest.util.HeaderUtil;

import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing Document.
 */
@RestController
@RequestMapping("/api")
public class DocumentResource {

	private final Logger log = LoggerFactory.getLogger(DocumentResource.class);

	private static final String ENTITY_NAME = "document";

	private final DocumentService documentService;

	private FileStorageService fileStorageService;

	public DocumentResource(DocumentService documentService) {
		this.documentService = documentService;
	}

	/**
	 * POST /documents : Create a new document.
	 *
	 * @param document the document to create
	 * @return the ResponseEntity with status 201 (Created) and with body the new
	 *         document, or with status 400 (Bad Request) if the document has
	 *         already an ID
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 */
	@PostMapping("/documents")
	public ResponseEntity<Document> createDocument(@Valid @RequestBody Document document) throws URISyntaxException {
		log.debug("REST request to save Document : {}", document);
		if (document.getId() != null) {
			throw new BadRequestAlertException("A new document cannot already have an ID", ENTITY_NAME, "idexists");
		}

		String fileName = fileStorageService.storeFile(document.getFile());

		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(fileName).toUriString();

		Document result = documentService.save(document);
		return ResponseEntity.created(new URI("/api/documents/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * PUT /documents : Updates an existing document.
	 *
	 * @param document the document to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated
	 *         document, or with status 400 (Bad Request) if the document is not
	 *         valid, or with status 500 (Internal Server Error) if the document
	 *         couldn't be updated
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 */
	@PutMapping("/documents")
	public ResponseEntity<Document> updateDocument(@Valid @RequestBody Document document) throws URISyntaxException {
		log.debug("REST request to update Document : {}", document);
		if (document.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		Document result = documentService.save(document);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, document.getId().toString()))
				.body(result);
	}

	/**
	 * GET /documents : get all the documents.
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of documents in
	 *         body
	 */
	@GetMapping("/documents")
	public List<Document> getAllDocuments() {
		log.debug("REST request to get all Documents");
		return documentService.findAll();
	}

	/**
	 * GET /documents/:id : get the "id" document.
	 *
	 * @param id the id of the document to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the document,
	 *         or with status 404 (Not Found)
	 */
	@GetMapping("/documents/{id}")
	public ResponseEntity<Document> getDocument(@PathVariable Long id) {
		log.debug("REST request to get Document : {}", id);
		Optional<Document> document = documentService.findOne(id);
		return ResponseUtil.wrapOrNotFound(document);
	}

	/**
	 * DELETE /documents/:id : delete the "id" document.
	 *
	 * @param id the id of the document to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/documents/{id}")
	public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
		log.debug("REST request to delete Document : {}", id);
		documentService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}
}
