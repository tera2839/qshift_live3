package com.quickshift.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.quickshift.entity.Admin;
import com.quickshift.repository.AdminRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminDetailsService implements UserDetailsService{
	
	private final AdminRepository adminRep;

	@Override
	public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
		
		Admin admin = adminRep.findByMail(mail);
		
		if(admin == null) {
			throw new UsernameNotFoundException("Admin not found with email : " + mail);
		}
		
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		
		return new User(admin.getMail(), admin.getPass(), authorities);
	}
}
