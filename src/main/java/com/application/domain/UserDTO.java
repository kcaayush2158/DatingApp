package com.application.domain;

import com.application.model.User;

import java.io.Serializable;

public class UserDTO implements Serializable {

    private User user;
    private String token;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDTO(User user, String token) {
        this.user = user;
        this.token = token;
    }
}
