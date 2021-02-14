package com.application.springboot.service;

import com.application.springboot.model.User;
import com.application.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingService {

    @Autowired
    private UserRepository userRepository;


    public void deleteUserProfile(String email){
         userRepository.deleteByEmail(email);
    }

    public User getAllUserByEmail(String email) {
        return userRepository.getAllByEmail(email);
    }

    public User changeUserPassword(String email){
        return userRepository.getAllByUsername(email);
  }




}
