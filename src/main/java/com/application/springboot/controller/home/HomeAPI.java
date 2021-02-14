package com.application.springboot.controller.home;


import com.application.springboot.model.User;
import com.application.springboot.model.notification.Notification;
import com.application.springboot.service.NotificationService;
import com.application.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class HomeAPI {
    @Autowired
    private UserService userService;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    @Qualifier("sessionRegistry")
    private SessionRegistry sessionRegistry;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/count/users/online")
    public @ResponseBody int getOnlineUsers(){
        return sessionRegistry.getAllPrincipals().size();
    }

    @GetMapping("/user/status/get")
    public User getUserStatus(boolean status ,Principal principal){
        return userService.getUserStatus(true,principal.getName());
    }

    @GetMapping("/user/status/{id}/update")
    public User updateUserStatus(@RequestParam("active") boolean active ,Principal principal){
        return userService.getUserStatus(active,principal.getName());
    }
    @GetMapping("/count/notification")
    public int countNotification(Principal principal) {
        return notificationService.countNewMessages(false,principal.getName());
    }


    @PostMapping("/users/notification/read")
    public Notification readNotificationWhenClicked(Principal principal){
        List<Notification> existedNotification = notificationService.getNotification(principal.getName());
        for (Notification ns : existedNotification){
            User user = userService.findByUsername(principal.getName());
             notificationService.readNotification(user);
        }
        return null;
    }

    @GetMapping("/users/notifications/get")
    public List<Notification> getAllNotifications(Principal principal,Notification notification){
        return notificationService.getNotification(principal.getName());
    }


    @GetMapping("/u/online")
    public List<Object> findMessagesForUser(@AuthenticationPrincipal User user) {
        List<Object> allPrincipal = sessionRegistry.getAllPrincipals();
        System.out.println(sessionRegistry.getAllPrincipals().size());
        for(Object l : allPrincipal){
            String dataObject = String.valueOf(l);
            System.out.print(dataObject);
        }
        return allPrincipal;
    }

    @GetMapping("/u/{email}/online/get")
    public User getAllOnlineUsers(@PathVariable("email") String email){
        User onlineUsers =  userService.findExistingEmail(email);
        return onlineUsers;
    }
    }
