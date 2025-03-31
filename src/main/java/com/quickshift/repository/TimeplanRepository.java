package com.quickshift.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.quickshift.entity.Store;
import com.quickshift.entity.Timeplan;

@Repository
public interface TimeplanRepository extends JpaRepository<Timeplan, Long>{
	List<Timeplan> findByStore(Store store);
	void deleteAllByStore(Store store);
	
	@Modifying
	@Query("UPDATE Timeplan t set t.name = :name, "
			+ "t.fromTime = :fromTime, "
			+ "t.toTime = :toTime "
			+ "WHERE t.id = :id")
	void updateName(
			@Param("id") Long id,
			@Param("name") String name,
			@Param("toTime") String toTime,
			@Param("fromTime") String fromTime
			);
}