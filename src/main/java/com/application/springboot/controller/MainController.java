package com.application.springboot.controller;

import com.application.springboot.model.AboutMe;
import com.application.springboot.model.User;
import com.application.springboot.model.message.Message;
import com.application.springboot.model.notification.Notification;
import com.application.springboot.repository.UserRepository;
import com.application.springboot.service.AboutMeService;
import com.application.springboot.service.NotificationService;
import com.application.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;
import java.util.List;

@Controller
public class MainController {
    @Autowired
    private SessionRegistry sessionRegistry;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private AboutMeService aboutMeService;


    @GetMapping("/signup")
    public String signUp(Model model, User user) {
        model.addAttribute("user", user);
        return "Signup";
    }


    @GetMapping(value = "/")
    public String listAllPage(Model model, Principal principal, AboutMe aboutMe,User user, Authentication authentication) {
        if (principal != null) {
            model.addAttribute("userProfiles",userService.getAllUserProfile());
            model.addAttribute("aboutMe", aboutMe);
            return "home";
        }
        return "index";
    }

    @GetMapping("/message")
    public String message(@ModelAttribute Message message, Model model) {
        model.addAttribute("message", message);
        return "message";
    }



}
