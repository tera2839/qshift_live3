package com.quickshift.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "calendar")
public class Calendar {
	
	@Id
	private Long id;
	
	private int cyear;
	
	private int cmonth;
	
	private int cdate;
}