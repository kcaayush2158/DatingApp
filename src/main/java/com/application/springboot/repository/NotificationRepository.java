package com.application.springboot.repository;

import com.application.springboot.model.User;
import com.application.springboot.model.notification.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.NamedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Integer> {

    // receives all the notification by subscribed username
     List<Notification> findByUserReceiverOrderByIdDesc(String receiver);

     int countNotificationsByStatusAndUserReceiver(boolean status,String receivers);

     List<Notification> getAllByStatus(boolean status);

     @Transactional
     @Modifying
     @Query("delete from Notification n WHERE n.id = :id ")
     int deleteNotificationById(@Param("id") int id);


     @Transactional
     @Modifying
     @Query(value="UPDATE Notification n set n.status=true where n.status=false and n.userReceiver=:user ")
     void readNotifications( @Param("user") User user);

 

     int countNotificationsByUserReceiver(@Param("userReceiver") String userReceiver);
}
