package com.application.springboot.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AboutMe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull(message = "Username cannot be empty")
    private String liveIn;
    @NotNull(message = "Work cannot be empty")
    private String workAs;
    @NotNull(message = "Education cannot be empty")
    private String education;
    @NotNull(message = "have Kids cannot be empty")
    private String haveKids;
    @NotNull(message = "Known cannot be empty")
    private String known;
    @Lob
    private String lookingFor;
    @NotNull(message = "Smoke cannot be empty")
    private String smoke;
    @NotNull(message = "Drink cannot be empty")
    private String drink;
    @NotNull(message = "Height cannot be empty")
    private String height;
    @NotNull(message = "Body Type cannot be empty")
    private String bodyType;
    @NotNull(message = "eyes cannot be empty")
    private String eyes;
    @NotNull(message = "hair cannot be empty")
    private String hair;
    @NotNull(message = "relationship cannot be empty")
    private String relationship;
    @NotNull(message = "Languages cannot be empty")
    private String languages;
    @NotEmpty(message = "Gender cannot be empty")
    private String gender;
    @Min(18)
    @Max(80)
    @NotNull(message = "Age cannot be empty")
    private int age;
    @NotNull(message = "Bio cannot be empty")
    private String bio;
    @Lob
    @NotNull(message = "Interests cannot be empty")
    private String interests;
    @NotNull(message = "Country cannot be empty")
    private String country;


}
