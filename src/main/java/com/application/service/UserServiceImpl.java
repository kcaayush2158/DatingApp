package com.application.service;

import com.application.model.User;
import com.application.repository.UserRepository;
import com.application.util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Transactional
@Service

public class UserServiceImpl implements UserService{
    @Autowired
    public UserRepository userRepository;

    @Override
    public User save(User user) {
        String password= PasswordUtil.getPasswordHash(user.getPassword());
        user.setPassword(password);
        user.setCreatedDate(new Date());
        return userRepository.save(user);
    }

    @Override
    public List<User> findAll() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email);
    }


}
