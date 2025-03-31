package com.quickshift.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quickshift.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long>{
	Admin findByMail(String mail);
}