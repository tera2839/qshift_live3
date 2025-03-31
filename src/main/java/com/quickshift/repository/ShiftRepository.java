package com.quickshift.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quickshift.entity.Calendar;
import com.quickshift.entity.Shift;
import com.quickshift.entity.Store;
import com.quickshift.entity.Timeplan;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Long>{
	List<Shift> findByStore(Store store);
	List<Shift> findByStoreAndCalendar(Store store, Calendar calendar);
	List<Shift> findByCalendarAndTimeplan(Calendar calendar, Timeplan timeplan);
}