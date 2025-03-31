package com.quickshift.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.quickshift.entity.Admin;
import com.quickshift.entity.Store;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long>{
	List<Store> findByAdmin(Admin admin);
	
	@Modifying
	@Query("UPDATE Store s SET s.url = :url WHERE s.id = :id")
	void updateUrl(@Param("id") Long id, @Param("url") String url);
}