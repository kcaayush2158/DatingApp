package com.application;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;

import static org.springframework.boot.SpringApplication.run;

@SpringBootApplication
@ComponentScan(basePackages = "com.application.model")
public class DatingApp {

    public static void main(String[] args) {
        run(DatingApp.class, args);
    }

    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration configure = new CorsConfiguration();
        configure.setAllowCredentials(true);
        configure.setAllowedHeaders(Collections.singletonList("*"));
        configure.addAllowedOrigin("*");
        configure.addAllowedMethod("OPTIONS");
        configure.addAllowedMethod("POST");
        configure.addAllowedMethod("GET");
        configure.addAllowedMethod("DELETE");
        configure.addAllowedMethod("PUT");
        source.registerCorsConfiguration("/**", configure);
        return new CorsFilter();
    }
}
