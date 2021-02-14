package com.application.springboot.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Data
@Getter
@Setter
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @ManyToOne
    private User likedBy;
    @ManyToOne
    private User likedTo;

    private boolean status;

}
