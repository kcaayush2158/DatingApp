package com.application.springboot.model;
import com.application.springboot.validator.FieldMatch;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.Collection;
import java.util.Date;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldMatch.List({
        @FieldMatch(first = "email", second = "confirmEmail", message = "Email does not match"),
        @FieldMatch(first = "password", second = "confirmPassword", message = "Password does not match")
})
@DynamicUpdate
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotNull(message = "First Name is required")
    private String firstName;
    @NotNull(message = "Last Name is required")
    private String lastName;
    @Email(message = "Email is invalid")
    @NotNull(message = "Email is invalid")
    private String email;
    private boolean isActive;
    @Size(message = "Password length should be more than 6 characters",min = 6)
    private String password;
    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @NotNull
    @Valid
    private AboutMe aboutMe;

    @NotNull(message = "Username cannot be empty")
    private String username;
    @Temporal(TemporalType.DATE)
    private Date createdDate;
    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
        @JoinTable( name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private Collection<Role> roles;
    @Temporal(TemporalType.DATE)
    private Date lastConnection;
    private String profilePhoto;
}