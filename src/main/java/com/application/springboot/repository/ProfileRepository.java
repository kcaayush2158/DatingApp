package com.application.springboot.repository;

import com.application.springboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProfileRepository extends JpaRepository<User,Integer> {



}
