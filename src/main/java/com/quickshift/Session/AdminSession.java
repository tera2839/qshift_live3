package com.quickshift.Session;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import com.quickshift.entity.Admin;
import com.quickshift.entity.Store;

import lombok.Data;

@Component
@Data
@SessionScope
public class AdminSession {
	
	private Admin admin;
	private Store store;
	private int year;
	private int month;
}