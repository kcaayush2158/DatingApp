package com.application.service;

import com.application.model.User;
import com.application.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {

    User save(User user);
    List<User> findAll();
    User getUserByEmail(String email);
}
