package com.application.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtil {

    static BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static String getPasswordHash(String password) {
        return passwordEncoder.encode(password);
    }
}
