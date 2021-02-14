package com.application.springboot.controller;

import com.application.springboot.model.User;
import com.application.springboot.model.notification.Notification;
import com.application.springboot.service.NotificationService;
import com.application.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
@RestController
@RequestMapping("/api")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private UserService userService;

    @GetMapping("/notification/all")
    public @ResponseBody List<Notification> notifications( Model model, Principal principal){
        return notificationService.getNotification(principal.getName());

    }

    @PostMapping("/notification/delete/{id}")
    public int deleteNotification(@PathVariable("id") int id){
        return notificationService.deleteNotification(id);
    }

    @PostMapping("/notification/read/{id}")
    public void readNotification(@PathVariable("id")int id,Principal principal){

       User user1 = userService.findUserById(id);
         notificationService.readNotification(user1);
    }
}
