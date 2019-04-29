package com.ipsas.printmanagement.service.impl;

import com.ipsas.printmanagement.domain.Document;
import com.ipsas.printmanagement.repository.DocumentRepository;
import com.ipsas.printmanagement.service.DocumentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileOutputStream;
import java.sql.Timestamp;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Document.
 */
@Service
@Transactional
public class DocumentServiceImpl implements DocumentService {

    private final Logger log = LoggerFactory.getLogger(DocumentServiceImpl.class);

    private final DocumentRepository documentRepository;

    public DocumentServiceImpl(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    /**
     * Save a document.
     *
     * @param document the entity to save
     * @return the persisted entity
     */
    @Override
    public Document save(Document document) {
        log.debug("Request to save Document : {}", document);
        return documentRepository.save(document);
    }

    @Override
    public String storeFile(Document document) {
        {
            try {
                //This will decode the String which is encoded by using Base64 class
                byte[] imageByte = Base64.getDecoder().decode(document.getFile());
                Timestamp ts = new Timestamp(new Date().getTime());
                String fileName = document.getTitle() + ts;
                String directory = "/home/lommja/Desktop/print_management/uploads/" + fileName + ".pdf";
                new FileOutputStream(directory).write(imageByte);
                return fileName;
            } catch (Exception e) {
                log.error("error = " + e);
                return null;
            }

        }
    }

    /**
     * Get all the documents.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Document> findAll() {
        log.debug("Request to get all Documents");
        return documentRepository.findAll();
    }


    /**
     * Get one document by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Document> findOne(Long id) {
        log.debug("Request to get Document : {}", id);
        return documentRepository.findById(id);
    }

    /**
     * Delete the document by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Document : {}", id);
        documentRepository.deleteById(id);
    }
}
