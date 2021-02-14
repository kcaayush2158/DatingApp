package com.application.springboot.controller.home;

import com.application.springboot.model.User;
import com.application.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.util.List;

@Controller
public class HomeController {
    @Autowired
    private UserService userService;

    @GetMapping(value = "/api/users/profile")
    public @ResponseBody  String getUserProfile(@RequestParam("limit")int limit, @RequestParam("start")int start, HttpSession session, Principal principal){
        List<User> users= userService.findAllUsersProfile(limit,start);

        String results ="";
        for (User user : users){
               results += " <div class=\"row\" style=\"float: left;\">   " +
                       "        <a href= "+"/user/profile/"+user.getUsername()+" id=\"card-href \" style=\"list-style-type:none;text-decoration:none;\" >  " +
                                 "<div class=\"card bg-light  mb-3 mr-5  ml-5 mt-2 \" > " +
                                       "<img class=\"card-img-top image-thumbnail\"  id=\"card-img\"  src=\""+user.getProfilePhoto()+"\"  alt=\"Card image cap\"> " +
                       "                  <div class=\"card-body\" >" +
                                             " <h5 class=\"card-title \" > "+user.getFirstName()+ ' '+user.getLastName()+ ' '+ user.getAboutMe().getAge()+" </h5> " +
                       "                    <p class=\"card-text\" id=\"card-bio\" >"+user.getAboutMe().getBio()+"</p>" +
                                     " </div>" +
                                "   </div>" +
                                " </a>" +
                       " </div> ";
        }
        return results;

    }

}
