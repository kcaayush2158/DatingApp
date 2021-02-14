package com.application.springboot.service;

import com.application.springboot.model.AboutMe;
import com.application.springboot.repository.AboutMeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AboutMeService  {

    @Autowired
    private AboutMeRepository aboutMeRepository;

    public AboutMe findAllAboutMe(int id){
        return aboutMeRepository.findById(id);

    }
    //save about me in our own profile
    public AboutMe saveAboutMe(AboutMe aboutMe){
        return aboutMeRepository.save(aboutMe);
    }


}
