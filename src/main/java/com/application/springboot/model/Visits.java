package com.application.springboot.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@Getter
@Setter
public class Visits {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @NotNull
    private User visitedUser;
    @ManyToOne
    @NotNull
    private User receivedUser;
    @NotNull
    private boolean status;

}
