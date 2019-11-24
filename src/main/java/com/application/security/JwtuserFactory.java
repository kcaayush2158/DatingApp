package com.application.security;

import com.application.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class JwtuserFactory {
    public static JwtUser create(User user) {
        return new JwtUser(user.getId(),user.getEmail(),user.getPassword(),user,maptoGrantedAuthorites(new ArrayList<String>(Arrays.asList("ROLE_"+user.getRole()))),user.isActive());
    }

    private static List<GrantedAuthority> maptoGrantedAuthorites(List<String> authorities) {
        return authorities.stream().map(Authority -> new SimpleGrantedAuthority(Authority)).collect(Collectors.toList());

    }


}
