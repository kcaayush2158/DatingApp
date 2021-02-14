package com.application.springboot.model.notification;

import com.application.springboot.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String userSender;
    private String userReceiver;
    @DateTimeFormat
    private Date datetime_added;
    private String message;
    private boolean status;
    @ManyToOne
    private User user;

}
