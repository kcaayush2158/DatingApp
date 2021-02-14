package com.application.springboot.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Getter
@Setter
@Data
public class Photos {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @NotEmpty
    private String photoUrl;
    @NotEmpty
    private String photoType;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private User principalName;
}
