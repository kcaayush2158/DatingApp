package com.application.springboot.service;

import com.application.springboot.model.User;
import com.application.springboot.model.notification.Notification;
import com.application.springboot.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    //save the user notification
    public Notification saveUserVisit(Notification notification){
       return notificationRepository.save(notification);
    }

    public List<Notification> getNotification(String receiver){
        return notificationRepository.findByUserReceiverOrderByIdDesc(receiver);
    }

    public int countNewMessages(boolean status,String receiver){
        return notificationRepository.countNotificationsByStatusAndUserReceiver(status ,receiver);
    }

    public int deleteNotification(int id){
        return notificationRepository.deleteNotificationById(id);
    }

    public void readNotification(User user){
        notificationRepository.readNotifications (user);
    }

    public int getTotalProfileViews(String email){
        return notificationRepository.countNotificationsByUserReceiver(email);
    }

}
