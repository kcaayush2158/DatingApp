package com.application;

import com.pusher.rest.Pusher;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collections;

@SpringBootApplication
public class SpringbootApplication {

    public static void main(String[] args) {

        SpringApplication.run(SpringbootApplication.class, args);

    }

}
