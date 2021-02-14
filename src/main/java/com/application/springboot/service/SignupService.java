package com.application.springboot.service;

import com.application.springboot.model.User;
import com.application.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignupService {

    @Autowired
    private UserRepository userRepository;

    public User registerUserAboutMe(User user){
       return userRepository.save(user);
    }
}
