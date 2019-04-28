package com.ipsas.printmanagement.repository;

import com.ipsas.printmanagement.domain.PrintOrder;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PrintOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrintOrderRepository extends JpaRepository<PrintOrder, Long> {

}
