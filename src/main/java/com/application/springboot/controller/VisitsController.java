package com.application.springboot.controller;

import com.application.springboot.model.User;
import com.application.springboot.model.Visits;
import com.application.springboot.service.UserService;
import com.application.springboot.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class VisitsController {
    @Autowired
    private VisitService visitService;
    @Autowired
    private UserService userService;

    @GetMapping("/visits")
    public List<Visits> getVisits(Principal principal){
        User loggedInUsers = userService.findExistingEmail(principal.getName());
        return  visitService.getUsers(loggedInUsers);
    }


    @GetMapping("/visits/users/count")
    public  int countTotalVisitedUsers(Principal principal){
        User user = userService.findExistingEmail(principal.getName());
        return visitService.countTotalVisitedUsers(user);
    }





}
