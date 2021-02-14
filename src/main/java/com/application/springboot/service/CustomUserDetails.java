package com.application.springboot.service;

import com.application.springboot.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {

    String role_prefix="ROLE_";
   private final String username;
   private final String password;
   private List<GrantedAuthority> authorities;
    String role;
    boolean active=true;
    User user;

    public CustomUserDetails( User user, String role){
       username = user.getUsername();
       password= user.getPassword();
       this.active=user.isActive();
       this.role= role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRoles().stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }


    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
