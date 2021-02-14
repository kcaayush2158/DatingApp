package com.application.springboot.model.message;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Message {

    @Id
    private int id;
    private String userName;
    private String messageText;
    private Date creationDateTime;
}