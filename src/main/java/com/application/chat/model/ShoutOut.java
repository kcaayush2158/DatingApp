package com.application.chat.model;

import com.application.springboot.model.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Data
public class ShoutOut {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String ip;
    @Lob
    private String message;
    @ManyToOne
    private User user;

}
