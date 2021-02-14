package com.application.springboot.service;

import com.application.springboot.model.User;
import com.application.springboot.model.Visits;
import com.application.springboot.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitService {

    @Autowired
    private VisitRepository visitRepository;

    public Visits saveVisits(Visits visits){
        return visitRepository.save(visits);
    }
    public List<Visits> getUsers(User user){
        return visitRepository.findDistinctByVisitedUser(user);
    }
    public int countTotalVisitedUsers(User visitedUser){
        return visitRepository.countDistinctByVisitedUser(visitedUser);
    }

}
