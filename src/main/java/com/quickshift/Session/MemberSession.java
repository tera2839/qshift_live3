package com.quickshift.Session;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import com.quickshift.entity.Member;
import com.quickshift.entity.Store;

import lombok.Data;

@Component
@Data
@SessionScope
public class MemberSession {
	
	private Member member;
	private Store store;
}