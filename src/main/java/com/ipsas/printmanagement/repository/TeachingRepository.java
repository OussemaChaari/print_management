package com.ipsas.printmanagement.repository;

import com.ipsas.printmanagement.domain.Teaching;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Teaching entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeachingRepository extends JpaRepository<Teaching, Long> {

}
