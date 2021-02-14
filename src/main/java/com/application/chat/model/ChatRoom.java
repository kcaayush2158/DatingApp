package com.application.chat.model;

import com.amazonaws.services.dynamodbv2.xspec.S;
import com.application.springboot.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String chatRoomName;
    private String chatRoomId;
    private String chatRoomDescription;
    private String type;
    private String password;
    private Date createdTime;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private User createdBy;
//    @ManyToOne(cascade = CascadeType.ALL)
//    private Conversation conversation;
}
