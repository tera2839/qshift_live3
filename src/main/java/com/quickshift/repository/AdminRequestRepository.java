package com.quickshift.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.quickshift.entity.AdminRequest;
import com.quickshift.entity.Calendar;
import com.quickshift.entity.Store;
import com.quickshift.entity.Timeplan;

@Repository
public interface AdminRequestRepository extends JpaRepository<AdminRequest, Long>{

	public List<AdminRequest> findByStore(Store store);
	public AdminRequest findByCalendarAndTimeplan(Calendar calendar, Timeplan timeplan);
	
	@Modifying
	@Query("UPDATE AdminRequest ar SET ar.num = :num WHERE ar.calendar.id = :calendar AND ar.timeplan.id = :timeplan")
	void updateName(@Param("num") String num, @Param("calendar") String calendar, @Param("timeplan") String timeplan);
}