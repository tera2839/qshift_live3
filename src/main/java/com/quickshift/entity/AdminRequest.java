package com.quickshift.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class AdminRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private int num;
	
	@ManyToOne
	@JoinColumn(name = "timeplan_id", referencedColumnName = "id")
	private Timeplan timeplan;
	
	@ManyToOne
	@JoinColumn(name = "store_id", referencedColumnName = "id")
	private Store store;
	
	@ManyToOne
	@JoinColumn(name = "calendar_id", referencedColumnName = "id")
	private Calendar calendar;
}