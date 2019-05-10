package com.ipsas.printmanagement.repository;

import com.ipsas.printmanagement.domain.Subject;
import com.ipsas.printmanagement.domain.Teaching;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Teaching entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeachingRepository extends JpaRepository<Teaching, Long> {

    @Query("SELECT DISTINCT t.subject FROM Teaching t where t.teacher.id = :teacherId and t.group.id = :groupId")
    List<Subject> getByTeacherIdAndGroupId(@Param("teacherId") Long teacherId, @Param("groupId") Long GroupId);

    @Query("SELECT DISTINCT t.group FROM Teaching t where t.teacher.id = :teacherId")
    List<Teaching> findAllByTeacherId(@Param("teacherId") Long teacherId);

    @Query("SELECT t FROM Teaching t where t.teacher.id = :teacherId and t.group.id = :groupId and t.subject.id = :subjectId")
    Teaching findByTeacherAndGroupAndSubject(@Param("teacherId") Long teacherId, @Param("groupId") Long groupId, @Param("subjectId") Long subjectId);
}
