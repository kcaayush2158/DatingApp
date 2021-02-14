package com.application.chat.model;

import com.application.springboot.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String ip;
    @NotEmpty(message = "Message cannot be empty")
    private String message;
    private boolean status;
    private Date date;
    @ManyToOne
    private User sender;
    @ManyToOne
    private User receiver;

}
